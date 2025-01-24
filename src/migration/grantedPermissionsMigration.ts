import { QueryInterface, Sequelize } from 'sequelize';

async function GrantedPermissionsMigration(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert('granted_permissions',
        [
            {
                permissionId: 'e5dd84cd-04ae-4639-a5da-2f5ec1d424cc', // admin features
                roleId: '5d385035-0a57-49fb-b0c2-c5e42760122e', // hr
                createdAt: '2025-01-23 14:46:30',
                updatedAt: '2025-01-23 14:46:30',
            },
            {
                permissionId: '388efb0f-ea5a-42b5-9e0a-19bde8e4c128', // user features
                roleId: '5d385035-0a57-49fb-b0c2-c5e42760122e', // hr
                createdAt: '2025-01-23 14:46:30',
                updatedAt: '2025-01-23 14:46:30',
            },
            {
                permissionId: '388efb0f-ea5a-42b5-9e0a-19bde8e4c128', // user features
                roleId: 'dfcc2d70-07fa-457a-9b37-6d6d623c5d40', // user
                createdAt: '2025-01-23 14:46:30',
                updatedAt: '2025-01-23 14:46:30',
            }
        ])
}

export { GrantedPermissionsMigration }
