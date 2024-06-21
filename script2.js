const FIXED_INTEREST = 10; // Interés mensual fijo del 5%
const MAX_AMOUNT = 200000; // Monto máximo del préstamo
const MAX_MONTHS = 12; // Número máximo de cuotas

function simulateLoan() {
    const amount = document.getElementById('amount').value;
    const months = document.getElementById('months').value;

    if (!amount || !months) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    if (amount > MAX_AMOUNT) {
        alert(`El monto máximo permitido es ${MAX_AMOUNT}.`);
        return;
    }

    if (months > MAX_MONTHS) {
        alert(`El número máximo de cuotas permitido es ${MAX_MONTHS}.`);
        return;
    }

    const monthlyInterest = FIXED_INTEREST / 100;
    const totalAmount = amount * Math.pow((1 + monthlyInterest), months);
    const monthlyPayment = totalAmount / months;

    const result = {
        amount: amount,
        interest: FIXED_INTEREST,
        months: months,
        totalAmount: totalAmount.toFixed(2),
        monthlyPayment: monthlyPayment.toFixed(2)
    };

    localStorage.setItem('loanSimulation', JSON.stringify(result));
    displayResult(result);
}

function displayResult(result) {
    const simulationResult = document.getElementById('simulationResult');
    simulationResult.innerHTML = `
        <p>Monto del Préstamo: ${result.amount}</p>
        <p>Interés Mensual: ${result.interest}%</p>
        <p>Plazo: ${result.months} meses</p>
        <p>Monto Total a Pagar: ${result.totalAmount}</p>
        <p>Pago Mensual: ${result.monthlyPayment}</p>
    `;
}

function sendToWhatsApp() {
    const result = JSON.parse(localStorage.getItem('loanSimulation'));
    if (!result) {
        alert('No hay datos de simulación para enviar.');
        return;
    }

    const message = `Simulación de Préstamo:\nMonto del Préstamo: ${result.amount}\nInterés Mensual: ${result.interest}%\nPlazo: ${result.months} meses\nMonto Total a Pagar: ${result.totalAmount}\nPago Mensual: ${result.monthlyPayment}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Eliminar el historial de localStorage después de enviar a WhatsApp
    localStorage.removeItem('loanSimulation');
    alert('La información del préstamo ha sido enviada a WhatsApp y el historial ha sido borrado.');
}

function resetSimulation() {
    localStorage.removeItem('loanSimulation');
    document.getElementById('loanForm').reset();
    document.getElementById('simulationResult').innerHTML = '';
}

function goToNewPage() {
    localStorage.removeItem('loanSimulation'); // Borra el historial en localStorage
    window.location.href = 'index.html'; // Reemplaza 'nueva_pagina.html' con la URL de la nueva página
}