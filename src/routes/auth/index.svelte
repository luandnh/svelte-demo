<script>
	import { Input, Image, Button, Form, FormGroup } from 'sveltestrap'
	import axios from 'axios'
	import variable from '../../variable'
	import { session } from '../../session'
	let username = ''
	let password = ''

	/**
	 * @param {string} message Message string
	 */
	const notifyError = (message) => {
		Swal.fire({
			icon: 'error',
			title: 'Error',
			text: message
		})
	}

	/**
	 * @param {string} username username
	 * @param {string} password password
	 */
	const login = async (username, password) => {
		return await axios
			.post(
				variable.API_HOST + '/v1/auth',
				JSON.stringify({
					username: username,
					password: password
				}),
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			.catch((error) => {
				console.log(error)
			})
	}

	/**
	 * @param {string} api_key
	 */
	const getToken = async (api_key) => {
		return await axios
			.post(
				variable.API_HOST + '/v1/auth/token',
				JSON.stringify({
					api_key: api_key
				}),
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			.catch((error) => {
				console.log(error)
				notifyError(error)
			})
	}

	async function handleSubmit(e) {
		e.preventDefault()

		if (username.length < 1) {
			notifyError('Username must not be empty')
			return
		}
		if (password.length < 1) {
			notifyError('Password must not be empty')
			return
		}
		login(username, password).then((res) => {
			let user = res.data
			let userData = user.data
			console.log('🚀 ~ file: index.svelte ~ line 71 ~ login ~ api_key', userData.api_key)

			if (userData.api_key.length < 1) {
				notifyError('API Key is empty')
				return
			}
			getToken(userData.api_key).then((res) => {
				let resData = res.data
				let tokenData = resData.data
				userData.token = tokenData.token
				session.init(userData)
			})
		})
	}
</script>

<main id="main-container">
	<div class="hero-static d-flex align-items-center">
		<div class="content">
			<div class="row justify-content-center push">
				<div class="col-md-8 col-lg-6 col-xl-4">
					<div class="block block-rounded mb-0">
						<!-- <div class="block-header block-header-default bg-pitel">
                            <h3 class="block-title">Sign In</h3>
                            <div class="block-options">
                                <a class="btn-block-option fs-sm" href="op_auth_reminder.html">Forgot Password?</a>
                                <a class="btn-block-option" href="op_auth_signup.html" data-bs-toggle="tooltip" data-bs-placement="left" title="New Account">
                                    <i class="fa fa-user-plus"></i>
                                </a>
                            </div>
                        </div> -->
						<div class="block-content">
							<div class="p-sm-3 px-lg-4">
								<h1 class="h2 mb-1 d-flex justify-content-center">
									<Image alt="Logo" src="/media/logo/logo.png" style="height: 80px" />
								</h1>
								<Form id="login-form" on:submit={handleSubmit}>
									<div class="py-3">
										<div class="mb-4">
											<Input
												type="text"
												class="form-control-alt form-control-lg"
												id="login-username"
												name="username"
												placeholder="Username"
												bind:value={username}
											/>
										</div>
										<div class="mb-4">
											<Input
												type="password"
												class="form-control-alt form-control-lg"
												id="login-password"
												name="password"
												placeholder="Password"
												bind:value={password}
											/>
										</div>
										<div class="mb-4">
											<FormGroup>
												<Input id="login-remember" type="checkbox" label="Remember Me" />
											</FormGroup>
										</div>
										<p class="fw-medium text-muted">Welcome, please login.</p>
										<div class="row mb-4">
											<div class="col-md-12 col-xl-12 d-flex justify-content-center">
												<Button primary class="text-white bg-pitel" id="loginBtn">
													<i class="fa fa-fw fa-sign-in-alt me-1 opacity-50" /> Sign In
												</Button>
											</div>
										</div>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="fs-sm  text-center">
				<strong
					>Copyright &copy; <span data-toggle="year-copy" />
					<a href="https://tongdaivoip.com">TEL4VN</a> All rights reserved.</strong
				>
			</div>
		</div>
	</div>
</main>

<style>
	#main-container {
		background-image: url(media/bg.jpg);
		background-size: cover;
	}
</style>
