const videoGrid = document.getElementById('videoGrid');
const hangupButton = document.getElementById('hangupButton');

/**
 * Gestiona la interfaz de usuario de la videoconferencia.
 */
export const UIManager = {
    createVideoElement: (userId) => {
        const containerDiv = document.createElement('div');
        containerDiv.className = 'video-container';
        containerDiv.id = `container-${userId}`;

        const videoElement = document.createElement('video');
        videoElement.id = `video-${userId}`;
        videoElement.autoplay = true;
        videoElement.playsInline = true;

        containerDiv.appendChild(videoElement);
        videoGrid.appendChild(containerDiv);
        return videoElement;
    },

    removeVideoElement: (userId) => {
        const containerDiv = document.getElementById(`container-${userId}`);
        if (containerDiv) {
            containerDiv.remove();
        }
    },

    /**
     * Registra el manejador para el botón de colgar
     * @param {Function} callback - Función a ejecutar cuando se hace clic en el botón
     */
    onHangup: (callback) => {
        hangupButton.addEventListener('click', callback);
    },

    /**
     * Muestra una animación de "desconectando" y limpia la interfaz
     */
    handleDisconnection: () => {
        // Añadir clase para animación de fade-out
        document.body.classList.add('disconnecting');
        
        // Limpiar todos los videos remotos
        const containers = document.querySelectorAll('.video-container');
        containers.forEach(container => {
            if (container.querySelector('video').id !== 'localVideo') {
                container.remove();
            }
        });
    }
};