export const reservationResponseDTO = (reservation) => {
    return {
        eventName: reservation.eventName,
        phone: reservation.phone,
        numberOfPeople: reservation.numberOfPeople,
        reservationDate: reservation.reservationDate,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        status: reservation.status,
        creationDate: reservation.creationDate,
        createdAt: reservation.createdAt,
        updatedAt: reservation.updatedAt,
        user: {
            name: reservation.user?.name,
            email: reservation.user?.email
        },
        department: {
            name: reservation.department?.name
        },
        space: {
            name: reservation.space?.name,
            capacity: reservation.space?.capacity
        }
    };
};
