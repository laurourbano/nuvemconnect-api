import { randomUUID } from 'crypto'
import { BadRequestError } from '../utils/error-handle'
import { Email } from './email'


export interface PasswordResetTokenProps {
  uuid: string,
  email: Email,
  token: string
  createdAt?: Date | null
}

export class PasswordResetToken {

  private props: PasswordResetTokenProps 
  private constructor (props: PasswordResetTokenProps){
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date()
    }
  }
  static create (email: string, token: string) {

    /* if(token.length !== 6){
      throw new BadRequestError('token invalid')
    } */
    if(!PasswordResetToken.isValidToken(token)){
      throw new BadRequestError('token invalid')
    }
    
    return new PasswordResetToken({
      uuid: randomUUID(),
      email: new Email(email),
      token
    })
  }

  static isValidToken (token: string): boolean {
    const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{6}$/
    return regex.test(token)
  }

  static reconstitute (props: PasswordResetTokenProps) {
    return new PasswordResetToken(props)
  }

  get uuid (): string {
    return this.props.uuid
  }
  get token (): string {
    return this.props.token
  }
  get email (): Email {
    return this.props.email
  }

  get createdAt (): Date | null | undefined{
    return this.props.createdAt
  }
}