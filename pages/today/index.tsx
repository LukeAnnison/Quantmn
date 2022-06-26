import { useCallback, useMemo, useState } from 'react'
import {
  Heading,
  Box,
  SimpleGrid,
  Button,
  Center,
  Container
} from '@chakra-ui/react'
import { map } from 'lodash'

import { IQuark } from '../../utils/types'
import styles from './today.module.scss'
import Quark from '../../models/quark'
import dbConnect from '../../utils/dbConnect'
import { useUpdateQuarkMutation, useGetQuarksQuery } from '../../store/apiSlice'

const Today = ({ quarks }: any) => {
    const filter = JSON.stringify({ name: "Test Quark"});
  const { data, refetch, isLoading, error } = useGetQuarksQuery()

  const [updateQuark] = useUpdateQuarkMutation()

  console.log('looking at data here', data)

  const notCompletedQuarks = useMemo(() => {
    let notCompleted = map(quarks, (quark: IQuark) => {
      if (quark.today_complete) {
        return quark
      }
    })
    return (notCompleted = notCompleted.filter(quark => quark !== undefined))
  }, [quarks])

  const createListOfQuarks = () => {
    console.log('createListOfQuarks')
  }

  const handleComplete = useCallback(async id => {
    console.log({ id })
    await updateQuark({
      id,
      data: { today_complete: true }
    })
    refetch()
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={styles.todayButton}>
        <Button onClick={createListOfQuarks} style={{}}>
          Create Today
        </Button>
      </div>
      {console.log({ notCompletedQuarks })}

      {data.map(quark => (
        <div style={{ display: 'flex' }}>
          <Button key={quark._id} onClick={e => handleComplete(quark._id)}>
            {quark.name}
          </Button>
        </div>
      ))}
    </div>
  )
}

export default Today

export async function getServerSideProps() {
  await dbConnect()

  /* find all the artists in our database, parse it, so readable by next */
  const response = await Quark.find({}).lean().select({
    name: 1,
    description: 1,
    price: 1,
    file: 1,
    _id: 1,
    today_complete: 1
  })

  if (!response) {
    return {
      notFound: true
    }
  }

  const quarks = JSON.parse(JSON.stringify(response))
  return { props: { quarks } }
}
