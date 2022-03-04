//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //Hide results
    document.getElementById('results').style.display = 'none';

    //Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calucalateResults, 2000);

 e.preventDefault();
});

//Calculate Results
function calucalateResults(){
    //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);                                         
    const calculatedIntrest = parseFloat(interest.value) /100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute Monthly payment
    const x = Math.pow(1 + calculatedIntrest, calculatedPayments);
    const monthly = (principal*x*calculatedIntrest)/(x-1);                    

    
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);                           
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);    
        totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);   

        //Show results
        document.getElementById('results').style.display = 'block';

        //Hider loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }  
}

//Show Error
function showError(error){
    
    //Hide results
    document.getElementById('results').style.display = 'none';

   //Hider loader
    document.getElementById('loading').style.display = 'none';

    //Create a div
    const errorDiv = document.createElement('div');

    //Add class
    errorDiv.className = 'alert alert-danger';

    // Get elements 
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading 
    card.insertBefore(errorDiv, heading);                                       

    //Clear error after 3 seconds
    setTimeout(clearError , 3000);                                  
} 

//Clear error
function clearError(){
    document.querySelector('.alert').remove();                    
}