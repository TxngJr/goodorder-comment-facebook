export interface IFanPage {
  id: number
  pageName: string
  followers: number
  likes: number
  description: string
  createdAt: string
  admin: string
  status: "Active" | "Inactive"
  image: string
}
