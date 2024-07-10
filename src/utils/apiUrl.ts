export const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/admin`

export const toolApiUrl = {
  all: '/tool',
  list: () => `${toolApiUrl.all}/list`,
  detail: (id: number) => `${toolApiUrl.all}/detail/${id}`,
}

export const workApiUrl = {
  all: '/work',
  list: () => `${workApiUrl.all}/list`,
  detail: (id: number) => `${workApiUrl.all}/detail/${id}`,
}

export const userApiUrl = {}

export const dashboardApiUrl = {}

export const authApiUrl = {}

export const loginApiUrl = {}
