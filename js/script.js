function onSubmit() {
    //getting personal information and credit card information
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let creditCard = document.getElementById('creditcard').value.trim();
    let creditCardMonth = document.getElementById('creditcard_expiry_month').value.trim();
    let creditCardYear = document.getElementById('creditcard_expiry_year').value.trim();

    //getting quantities
    let noOfWaterBottle = document.getElementById('water-bottle').value.trim() ?? 0;
    let noOfCaps = document.getElementById('cap').value.trim() ?? 0;
    let noOfPens = document.getElementById('pen').value.trim() ?? 0;
    let noOfCandyBags = document.getElementById('candy-bag').value.trim() ?? 0;
    let noOfCupCakes = document.getElementById('cup-cake').value.trim() ?? 0;

    let errroMessage = document.getElementById('errorMessage');
    let receipt = document.getElementById('receipt');

    //basic declarations
    let errors = [];
    errroMessage.innerHTML = '';
    receipt.style.display = 'none';

    //Validations
    let isEmailValid = /^[\w-\.0-9]+@(\w)+\.[\w]{2,4}$/.test(email);
    if (!isEmailValid) {
        errors.push('Invalid email format');
    }

    let isCreditCardValid = /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(creditCard);
    if (!isCreditCardValid) {
        errors.push('Invalid credit card');
    }
    let isMonthValid = /^(JAN|FEB|MAR|APR|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/.test(creditCardMonth.toUpperCase());
    if (!isMonthValid) {
        errors.push('Invalid month of credit card');
    }

    let isYearValid = /^\d{4}$/.test(creditCardYear);
    if (!isYearValid) {
        errors.push('Invalid year of credit card');
    }

    const price = { waterbottle: 5, cap: 20, pen: 2, candy: 10, cupcake: 3 };
    const quantity = { waterbottle: noOfWaterBottle, cap: noOfCaps, pen: noOfPens, candy: noOfCandyBags, cupcake: noOfCupCakes };

    if (isNaN(quantity.waterbottle) || isNaN(quantity.cap) || isNaN(quantity.pen) || isNaN(quantity.candy) || isNaN(quantity.cupcake)) {
        errors.push('Please choose a valid quantity');
    }

    if (noOfWaterBottle <= 0 && noOfCandyBags <= 0 && noOfCaps <= 0 && noOfCupCakes <= 0 && noOfPens <= 0) {
        errors.push('Please choose at least one item');
    }

    let hasAnyErrors = errors.length > 0;
    if (hasAnyErrors) {
        errroMessage.innerHTML = errors.join('<br>');
    }

    //calculations
    const totalAmount = (noOfWaterBottle * price.waterbottle) + (noOfCandyBags * price.candy) +
        (noOfCaps * price.cap) + (noOfCupCakes * price.cupcake) + (noOfPens * price.pen);


    const donationAmount = Math.max(10, totalAmount * 0.1);

    const totalPayableAmount = totalAmount + donationAmount;

    const lastpartOfCreditCard = creditCard.slice(-4);

    //displaying Receipt tables
    if (!hasAnyErrors) {
        const headerTag = generateHeader();
        const customerInfoTable = generateCustomerInfoTable(name, email, lastpartOfCreditCard);
        const receiptTable = generateReceiptTable(price,quantity, donationAmount, totalPayableAmount);
        
        receipt.innerHTML = `${headerTag} ${customerInfoTable} ${receiptTable}`;
        receipt.style.display = 'block';
    }
}

function generateHeader() {
    let headerTag = '<h2>Conestoga Garage Sale</h2><h3>Raising money for the frontline fund</h3>';
    headerTag += '<p><b>Thank you for your purchase!</b></p>';
    return headerTag;
}

function generateCustomerInfoTable(name, email, lastpartOfCreditCard) {
    //general Information table
    let customerInfoTable = '<table>';
    customerInfoTable += `<tr><td><b>Name</b></td><td>${name}</td></tr>`;
    customerInfoTable += `<tr><td><b>Email</b></td><td>${email}</td></tr>`;
    customerInfoTable += `<tr><td><b>Credit Card</b></td><td>xxxx-xxxx-xxxx-${lastpartOfCreditCard}</td></tr>`;
    customerInfoTable += '</table></br>';
    return customerInfoTable;
}

function generateReceiptTable(price, quantity, donationAmount, totalPayableAmount) {
    let table = '<table>';
        table += '<tr><th>Item</th><th>Quantity</th><th>Unit Price</th><th>Total Price</th></tr>';

        if (quantity.waterbottle > 0) {
            table += `<tr><td>Water Bottle</td><td>${quantity.waterbottle}</td><td>$${price.waterbottle.toFixed(2)}</td><td>$${(quantity.waterbottle * price.waterbottle).toFixed(2)}</td></tr>`;
        }
        if (quantity.cap > 0) {
            table += `<tr><td>Cap</td><td>${quantity.cap}</td><td>$${price.cap.toFixed(2)}</td><td>$${(quantity.cap * price.cap).toFixed(2)}</td></tr>`;
        }
        if (quantity.pen > 0) {
            table += `<tr><td>Pen</td><td>${quantity.pen}</td><td>$${price.pen.toFixed(2)}</td><td>$${(quantity.pen * price.pen).toFixed(2)}</td></tr>`;
        }
        if (quantity.candy > 0) {
            table += `<tr><td>Candy Bag</td><td>${quantity.candy}</td><td>$${price.candy.toFixed(2)}</td><td>$${(quantity.candy * price.candy).toFixed(2)}</td></tr>`;
        }
        if (quantity.cupcake > 0) {
            table += `<tr><td>Cup Cake</td><td>${quantity.cupcake}</td><td>$${price.cupcake.toFixed(2)}</td><td>$${(quantity.cupcake * price.cupcake).toFixed(2)}</td></tr>`;
        }

        table += `<tr><td>Donation</td><td colspan="2">Minimum</td><td>$${donationAmount.toFixed(2)}</td></tr>`;
        table += `<tr><td colspan="3">Total</td><td>$${totalPayableAmount.toFixed(2)}</td></tr>`;

        table += '</table>';
        return table;
}