import { QueryInterface, Sequelize } from 'sequelize';

async function PermissionsMigration(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert('permissions',
        [
            {
                permissionId: 'e5dd84cd-04ae-4639-a5da-2f5ec1d424cc',
                permissionName: 'admin_features',
                createdAt: '2025-01-23 14:46:30',
                updatedAt: '2025-01-23 14:46:30',
            },
            {
                permissionId: '388efb0f-ea5a-42b5-9e0a-19bde8e4c128',
                permissionName: 'user_features',
                createdAt: '2025-01-23 14:46:30',
                updatedAt: '2025-01-23 14:46:30',
            }
        ])
}

export { PermissionsMigration }
