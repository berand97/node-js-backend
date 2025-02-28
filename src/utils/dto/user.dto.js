export const userResponseDTO = (user) => {
    return {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role ? {
            id: user.role.id,
            name: user.role.role
        } : null
    };
};
