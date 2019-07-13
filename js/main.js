"use strict";

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName("budget-value")[0],
    dayBudgetValue = document.getElementsByClassName("daybudget-value")[0],
    levelValue =  document.getElementsByClassName("level-value")[0],
    expensesValue = document.getElementsByClassName("expenses-value")[0],
    optionalExpensesValue = document.getElementsByClassName("optionalexpenses-value")[0], 
    incomValue = document.getElementsByClassName("income-value")[0],
    monthSavingsValue = document.querySelector(".monthsavings-value"),
    yearSavingsValue = document.querySelector(".yearsavings-value"),

    expensesItem = document.getElementsByClassName("expenses-item"),
    expensesBtn = document.getElementsByTagName("button") [0],
    optionalExpensesBtn = document.getElementsByTagName("button") [1],
    countBtn = document.getElementsByTagName("button") [2],
    optionalExpensesItem = document.getElementsByClassName("optionalexpenses-item"),
    incomeItem = document.querySelector(".choose-income"),
    checkSavings = document.querySelector("#savings"),
    sumValue = document.querySelector(".choose-sum"),
    percentValue = document.querySelector(".choose-percent"),
    yearValue = document.querySelector(".year-value"),
    monthValue = document.querySelector(".month-value"),
    dayValue = document.querySelector(".day-value");

expensesBtn.style.display = "none";
countBtn.style.display = "none";
optionalExpensesBtn.style.display = "none";

let money, time;

let appData = {
    budget:money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

function trueStart(){
    expensesBtn.style.display = "block";
    countBtn.style.display = "block";
    optionalExpensesBtn.style.display = "block";
}

startBtn.addEventListener('click', function(){
    trueStart();
    // time = prompt("Введите дату в формате YYYY-MM-DD(ГОД-МЕСЯЦ-ДЕНЬ)"),
    money = +prompt("Каков ваш бюджет на месяц?");
    
    while((isNaN(money)) || money == "" || money == null){
        money = +prompt("Каков ваш бюджет на месяц?");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
})

expensesBtn.addEventListener('click',function(){
    let sum = 0;
    for(let i = 0; i < expensesItem.length; i++){
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
        if ((typeof(a)) === "string" && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != ''
        && a.length < 50){
            console.log("Done");
            appData.expenses[a] = [b];
            sum += +b;
        }else {
            i--;
        }
    expensesValue.textContent = sum;
    }
});

optionalExpensesBtn.addEventListener('click', function() {
    for(let i = 0; i < optionalExpensesItem.length; i++){
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        
        if(i != optionalExpensesItem.length - 1){
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ', ';
        }else{
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + '; ';
        }
        optionalExpensesItem[i].value = "";
    }
    
});

countBtn.addEventListener('click', function(){
    if(appData.budget != undefined){
        for(let i = 0; i < expensesItem.length; i++){
            let b = expensesItem[++i].value;
            appData.budget = +(appData.budget - b) ;
        }
        appData.moneyPerDay = (appData.budget / 30).toFixed(2);
        dayBudgetValue.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100){
            levelValue.textContent = "Минимальный уровень достатка.";
        }else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
            levelValue.textContent = "Средний уровень достатка.";
        }else if(appData.moneyPerDay > 100 && appData.moneyPerDay > 2000){
            levelValue.textContent = "Высокий уровень достатка.";
        }else{
            levelValue.textContent = "Что-то пошло не так...";
        }
    }
});
    
// }else{
//     dayBudgetValue.textContent = "Нажмите кнопку \"Начать расчет\" и введите ваш бюджет на месяц";
// }


incomeItem.addEventListener('input', function(){
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomValue.textContent = appData.income;
})

checkSavings.addEventListener('click', function(){
    if(appData.savings == true){
        appData.savings = false;
    }else{
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function(){
    if(appData.savings == true){
        let sum = +sumValue.value,
            percent = +percentValue.value;
        appData.yearIncome = sum / 100 * 12 * percent;
        appData.monthIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(2);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(2);
    }
});

percentValue.addEventListener('input', function(){
    if(appData.savings == true){
        if(appData.savings == true){
            let sum = +sumValue.value,
                percent = +percentValue.value;
            appData.yearIncome = sum / 100 * 12 * percent;
            appData.monthIncome = sum / 100 * percent;
    
            monthSavingsValue.textContent = appData.monthIncome.toFixed(2);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(2);
        }
    }
});
