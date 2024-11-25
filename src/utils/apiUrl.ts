export const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/admin`

export const toolApiUrl = {
  default: '/tool',
  all: () => `${toolApiUrl.default}`,
  create: () => `${toolApiUrl.default}/create`,
  edit: () => `${toolApiUrl.default}/edit`,
  editOrder: () => `${toolApiUrl.default}/edit/order`,
  detail: (id: number) => `${toolApiUrl.default}/detail/${id}`,
  delete: (id: number) => `${toolApiUrl.default}/delete/${id}`,
}

export const workApiUrl = {
  default: '/work',
  list: () => `${workApiUrl.default}/list`,
  listAll: () => `${workApiUrl.default}/list_all`,
  create: () => `${workApiUrl.default}/create`,
  edit: (id: number) => `${workApiUrl.default}/edit/${id}`,
  detail: (id: number) => `${workApiUrl.default}/detail/${id}`,
  delete: (id: number) => `${workApiUrl.default}/delete/${id}`,
  uploadImage: () => `${workApiUrl.default}/upload_image`,
  deleteImage: () => `${workApiUrl.default}/delete_image`,
  editImage: () => `${workApiUrl.default}/edit_image`,
  editOrder: () => `${workApiUrl.default}/edit_order`,
}

export const userApiUrl = {
  default: '/user',
  all: () => `${userApiUrl.default}`,
  create: () => `${userApiUrl.default}/create`,
  edit: (id: number) => `${userApiUrl.default}/edit/${id}`,
  detail: (id: number) => `${userApiUrl.default}/detail/${id}`,
  delete: (id: number) => `${userApiUrl.default}/delete/${id}`,
}

export const dashboardApiUrl = {
  default: '/dashboard',
}

export const authApiUrl = {
  default: '/auth',
  login: () => `${authApiUrl.default}/login`,
  logout: () => `${authApiUrl.default}/logout`,
  signup: () => `${authApiUrl.default}/signup`,
}
