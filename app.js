//Listen for sumbit
document.getElementById('load-form');
document.addEventListener ('submit', function(e){
    //Hide Results
    document.getElementById('results').style.display = 'none';
    //Show Loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//Calculate Results
function calculateResults(){
    console.log('Calculating...');

    //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly* calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly* calculatedPayment)-principal).toFixed(2);
//Show results
        document.getElementById('results').style.display = 'block';
//Hide Loader
document.getElementById('loading').style.display = 'none';

    } else{
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'none';

        showError('Please check your numbers');
    }

    
}

//Show Error
function showError(error){
    //Create a div
    const errorDiv = document.createElement('div');

    //Get Element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add Class
    errorDiv.className = 'alert alert-danger';

    //Create textnode and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading

    card.insertBefore(errorDiv, heading);

    //Clear Error after 3 sec

    setTimeout(clearError, 3000);
    
}

//Cleaar Error
function clearError(){
    document.querySelector('.alert').remove();
}