/**
 * Generador de Código QR para Datos de Contacto (vCard)
 * Genera un código QR escaneble con información de contacto
 */

// Elementos del DOM
const form = document.getElementById('contactForm');
const qrcodeContainer = document.getElementById('qrcode');
const submitBtn = document.getElementById('submitBtn');

/**
 * Valida un campo de texto
 * @param {string} value - Valor a validar
 * @param {string} fieldName - Nombre del campo para el mensaje de error
 * @returns {Object} - {valid: boolean, message: string}
 */
function validateField(value, fieldName) {
    if (!value || value.trim() === '') {
        return {
            valid: false,
            message: `El campo ${fieldName} es obligatorio`
        };
    }
    return { valid: true, message: '' };
}

/**
 * Valida el formato del email
 * @param {string} email - Email a validar
 * @returns {Object} - {valid: boolean, message: string}
 */
function validateEmail(email) {
    if (!email || email.trim() === '') {
        return {
            valid: false,
            message: 'El campo Email es obligatorio'
        };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            valid: false,
            message: 'Por favor ingresa un email válido'
        };
    }
    
    return { valid: true, message: '' };
}

/**
 * Valida el formato del teléfono
 * @param {string} telefono - Teléfono a validar
 * @returns {Object} - {valid: boolean, message: string}
 */
function validatePhone(telefono) {
    if (!telefono || telefono.trim() === '') {
        return {
            valid: false,
            message: 'El campo Teléfono es obligatorio'
        };
    }
    
    // Permite números, espacios, guiones, paréntesis y el símbolo +
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(telefono)) {
        return {
            valid: false,
            message: 'El teléfono solo puede contener números, espacios y los símbolos: + - ( )'
        };
    }
    
    // Verifica que tenga al menos 7 dígitos
    const digitsOnly = telefono.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
        return {
            valid: false,
            message: 'El teléfono debe tener al menos 7 dígitos'
        };
    }
    
    return { valid: true, message: '' };
}

/**
 * Muestra un mensaje de error en el formulario
 * @param {string} message - Mensaje de error a mostrar
 */
function showError(message) {
    // Eliminar error anterior si existe
    const existingError = document.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }
    
    // Crear nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    
    // Insertar después del botón
    submitBtn.parentNode.insertBefore(errorDiv, submitBtn.nextSibling);
    
    // Hacer scroll suave al error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Elimina el mensaje de error si existe
 */
function clearError() {
    const existingError = document.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Genera el formato vCard para el código QR
 * @param {Object} data - Datos del contacto
 * @returns {string} - String en formato vCard
 */
function generateVCard(data) {
    return `BEGIN:VCARD
VERSION:3.0
N:${data.apellido};${data.nombre};;;
FN:${data.nombre} ${data.apellido}
TEL;TYPE=CELL:${data.telefono}
EMAIL:${data.email}
END:VCARD`;
}

/**
 * Crea un botón de descarga para el código QR
 * @param {HTMLCanvasElement} canvas - Canvas del código QR
 * @param {string} nombre - Nombre para el archivo
 */
function createDownloadButton(canvas, nombre) {
    // Eliminar botón anterior si existe
    const existingBtn = document.getElementById('downloadLink');
    if (existingBtn) {
        existingBtn.remove();
    }
    
    // Crear nuevo botón de descarga
    const downloadLink = document.createElement('a');
    downloadLink.id = 'downloadLink';
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = `QR_${nombre}.png`;
    downloadLink.textContent = '📥 Descargar QR';
    downloadLink.setAttribute('aria-label', 'Descargar código QR como imagen PNG');
    
    qrcodeContainer.appendChild(downloadLink);
}

/**
 * Muestra un estado de carga en el botón
 * @param {boolean} loading - true para mostrar loading, false para ocultar
 */
function setLoadingState(loading) {
    if (loading) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Generando...';
    } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Generar Código QR';
    }
}

/**
 * Función principal: Genera el código QR
 */
function generarQR() {
    // Limpiar errores previos
    clearError();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    
    // Validar campos
    const validaciones = [
        validateField(nombre, 'Nombre'),
        validateField(apellido, 'Apellido'),
        validatePhone(telefono),
        validateEmail(email)
    ];
    
    // Buscar primera validación fallida
    const primeraFalla = validaciones.find(v => !v.valid);
    
    if (primeraFalla) {
        showError(primeraFalla.message);
        return;
    }
    
    // Mostrar estado de carga
    setLoadingState(true);
    
    // Pequeño delay para efecto visual
    setTimeout(() => {
        try {
            // Generar vCard
            const vcard = generateVCard({ nombre, apellido, telefono, email });
            
            // Limpiar contenedor QR
            qrcodeContainer.innerHTML = '';
            
            // Generar código QR
            const qrCode = new QRCode(qrcodeContainer, {
                text: vcard,
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H // Mayor nivel de corrección de errores
            });
            
            // Esperar a que se genere el canvas
            setTimeout(() => {
                const canvas = qrcodeContainer.querySelector('canvas');
                if (canvas) {
                    createDownloadButton(canvas, `${nombre}_${apellido}`);
                }
                setLoadingState(false);
                
                // Hacer scroll suave al QR generado
                qrcodeContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
            
        } catch (error) {
            console.error('Error al generar QR:', error);
            showError('Ocurrió un error al generar el código QR. Por favor intenta nuevamente.');
            setLoadingState(false);
        }
    }, 300);
}

// Event listener opcional para Enter en los inputs
form.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        generarQR();
    }
});