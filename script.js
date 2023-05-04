document
  .getElementById("mortgage-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const interestRate =
      parseFloat(document.getElementById("interestRate").value) / 100;
    let loanTerm = parseInt(document.getElementById("loanTerm").value) * 12;
    let extraPayment = parseFloat(
      document.getElementById("extraPayment").value
    );

    let monthlyInterestRate = interestRate / 12;
    let factor = Math.pow(1 + monthlyInterestRate, loanTerm);

    let monthlyPayment =
      (loanAmount * monthlyInterestRate * factor) / (factor - 1);
    let remainingBalance = loanAmount;
    let totalPayments = 0;
    let totalInterestPaid = 0;

    while (remainingBalance > 0) {
      let interestPayment = remainingBalance * monthlyInterestRate;
      let principalPayment = monthlyPayment - interestPayment;
      let adjustedExtraPayment = extraPayment;

      if (remainingBalance < principalPayment + extraPayment) {
        principalPayment = remainingBalance;
        adjustedExtraPayment = 0;
      } else {
        remainingBalance -= adjustedExtraPayment;
      }

      remainingBalance -= principalPayment;
      totalInterestPaid += interestPayment;
      totalPayments++;
    }

    let updatedLoanTermYears = Math.floor(totalPayments / 12);
    let updatedLoanTermMonths = totalPayments % 12;
    document.getElementById("result").innerHTML = `
        <div class="totals">
            <h1>Total</h1>
            <small>Monthly Payment (without extra principal)</small><br> $${monthlyPayment.toFixed(
              2
            )}<br><br>
            <small>Loan Term (with extra principal)</small><br> ${updatedLoanTermYears} years and ${updatedLoanTermMonths} months<br><br>
            <small>Total Payments (with extra principal)</small><br> ${totalPayments}<br><br>
            <small>Total Interest Paid</small><br> $${totalInterestPaid.toFixed(
              2
            )}
        </div>
        `;
  });
