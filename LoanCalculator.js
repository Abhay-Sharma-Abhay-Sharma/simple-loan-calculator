window.onload = () => {
    const inputs = document.querySelectorAll("input");
    const calculateBtn = document.getElementById('calculateBtn');

    inputs.forEach(input => {
        input.addEventListener('change', calculateLoan);
    });

    calculateBtn.addEventListener('click', function() {
        calculateLoan();
    });
}

function calculateLoan() {
    const principal = parseFloat(document.querySelector('#amount').value);
    const annualInterestRate = parseFloat(document.querySelector('#interest').value);
    const tenure = parseFloat(document.querySelector('#tenure').value);

    if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(tenure) || annualInterestRate <= 0 || tenure <= 0) {
        // Invalid input, handle accordingly (e.g., show an error message)
        return;
    }

    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = tenure * 12;

    const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalAmount = emi * numberOfPayments;
    const totalInterest = totalAmount - principal;

    document.querySelector('#emi').innerText = 'Loan EMI: ₹' + emi.toFixed(2);
    document.querySelector('#totalAmount').innerText =
        'Total Payment: ₹' + totalAmount.toFixed(2);
    document.querySelector('#totalInterest').innerHTML =
        'Total Interest Payable: ₹' + totalInterest.toFixed(2);
}
