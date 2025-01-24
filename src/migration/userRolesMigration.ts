import { QueryInterface, Sequelize } from 'sequelize';

async function userRolesMigration(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert('user_role',
        [
            {
                roleId: '5d385035-0a57-49fb-b0c2-c5e42760122e',
                roleName: 'hr',
                createdAt: '2025-01-23 14:46:30',
                updatedAt: '2025-01-23 14:46:30',
            },
            {
                roleId: 'dfcc2d70-07fa-457a-9b37-6d6d623c5d40',
                roleName: 'user',
                createdAt: '2025-01-23 14:46:30',
                updatedAt: '2025-01-23 14:46:30',
            }
        ])
}

export { userRolesMigration }
