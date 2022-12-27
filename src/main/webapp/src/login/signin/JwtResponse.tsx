export default interface JwtResponse {
    type: string,
    token: string,
    id: number,
    username: string,
    email: string,
    role: string[],
}