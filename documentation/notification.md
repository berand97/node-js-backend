# 🔔 Sistema de Notificaciones para Aprobaciones de Reservaciones

## 📌 ¿Cómo funciona?
1. **Cuando se crea una reservación**, se notifica a los administradores o vicerrectores, dependiendo de los permisos requeridos.
2. **Cuando un usuario aprueba/rechaza una reservación**, se notifica al solicitante y a los demás responsables.
3. **Si una reservación no se aprueba en 24h**, se envía un recordatorio.

---

## 🏗️ 1️⃣ Modelo de Notificación (Sequelize)
```javascript
import sequelize from "../config/database.config.js";
import { DataTypes } from "sequelize";

export const Notification = sequelize.define("Notification", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("unread", "read"),
        defaultValue: "unread",
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "notifications"
});


import { BaseRepository } from "./base.repository.js";
import { Notification } from "../schemas/notification.scheme.js";

export class NotificationRepository extends BaseRepository {
    constructor() {
        super(Notification);
    }

    async getUnreadNotifications(userId) {
        return await this.model.findAll({ where: { userId, status: "unread" } });
    }

    async markAsRead(notificationId) {
        return await this.model.update({ status: "read" }, { where: { id: notificationId } });
    }

    async createNotification(userId, message) {
        return await this.create({ userId, message });
    }
}


import { NotificationRepository } from "../repositories/notification.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import EmailService from "./email.service.js";

class NotificationService {
    constructor() {
        this.notificationRepository = new NotificationRepository();
        this.userRepository = new UserRepository();
    }

    async notifyApprovers(reservationId, requiredRoles) {
        const approvers = await this.userRepository.getUsersByRoles(requiredRoles);
        const message = Tienes una nueva reservación (#${reservationId}) pendiente de aprobación.;

        for (const approver of approvers) {
            await this.notificationRepository.createNotification(approver.id, message);
            await EmailService.sendEmail(approver.email, "Nueva Aprobación Pendiente", message);
        }
    }

    async notifyRequester(reservationId, userId, status) {
        const message = Tu reservación (#${reservationId}) ha sido ${status}.;
        await this.notificationRepository.createNotification(userId, message);
    }
}

export default new NotificationService();


import NotificationService from "../services/notification.service.js";

class NotificationController {
    async getNotifications(req, res) {
        try {
            const notifications = await NotificationService.getUnreadNotifications(req.user.id);
            return res.status(200).json({ notifications });
        } catch (error) {
            console.error("Error obteniendo notificaciones:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async markAsRead(req, res) {
        try {
            await NotificationService.markAsRead(req.params.id);
            return res.status(200).json({ message: "Notificación marcada como leída." });
        } catch (error) {
            console.error("Error marcando notificación como leída:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }
}

export default new NotificationController();


import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
    }

    async sendEmail(to, subject, text) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };
        await this.transporter.sendMail(mailOptions);
    }
}

export default new EmailService();


EMAIL_USER=tuemail@gmail.com
EMAIL_PASS=tucontraseña


import cron from "node-cron";
import NotificationService from "../services/notification.service.js";

cron.schedule("0 9 * * *", async () => {  // Se ejecuta todos los días a las 9 AM
    console.log("🔔 Enviando recordatorios de reservaciones pendientes...");
    await NotificationService.sendApprovalReminders();
});


import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class TelegramService {
    async sendMessage(message) {
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
        const url = https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage;
        await axios.post(url, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        });
    }
}

export default new TelegramService();


TELEGRAM_BOT_TOKEN=tu-bot-token
TELEGRAM_CHAT_ID=tu-chat-id
```

