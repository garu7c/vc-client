export class PeerConnectionManager {
    constructor() {
        this.peerConnections = new Map(); // Map of userId -> RTCPeerConnection
        this.localStream = null;
        this.rtcManager = null;
    }

    setRtcManager(rtcManager) {
        this.rtcManager = rtcManager;
    }

    async setupLocalStream() {
        this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (this.rtcManager) this.rtcManager.setLocalStream(this.localStream);
        return this.localStream;
    }

    createPeerConnection(userId) {
        const peerConnection = new RTCPeerConnection();
        this.peerConnections.set(userId, peerConnection);
        return peerConnection;
    }

    removePeerConnection(userId) {
        const connection = this.peerConnections.get(userId);
        if (connection) {
            connection.close();
            this.peerConnections.delete(userId);
        }
    }

    /**
     * Cierra todas las conexiones peer y limpia los recursos
     */
    closeAllConnections() {
        // Cerrar todas las conexiones peer
        for (const [userId, connection] of this.peerConnections) {
            connection.close();
            this.peerConnections.delete(userId);
        }

        // Detener el stream local si existe
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }
    }
}