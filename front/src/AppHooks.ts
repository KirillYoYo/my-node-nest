import { useQuery } from '@apollo/client'
import { GET_PERSON_EMAIL } from './AppQl'

export const useGetMails = () => useQuery<{ Person: any }>(GET_PERSON_EMAIL, {})
