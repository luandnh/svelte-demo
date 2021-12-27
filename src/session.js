import { user, isAuthenticated } from './store'

export const session = (() => {
	return {
		init: (value) => {
			isAuthenticated.set(true)
			user.set(value)
		},
		remove: () => {
			user.set({})
			isAuthenticated.set(false)
		}
	}
})()
