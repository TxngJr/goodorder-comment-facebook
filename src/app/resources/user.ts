import { IUser } from '../types/user'

export const mockUser: IUser = {
  username: 'admin',
  merchant: 'admin',
  roles: ['admin', 'superAdmin'],
  abilities: {
    'create:own_user': true,
    'create:any_user': true,
    'read:own_user': true,
    'read:any_user': true,
    'update:own_user': true,
    'update:any_user': true,
    'delete:own_user': true,
    'delete:any_user': true,
  },
}
