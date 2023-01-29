import React, { useEffect } from 'react'
import styles from './MeetupsPage.module.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { MeetupsList } from '../../components/lists/meetupsList/MeetupsList'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../context/storeContext'

const MeetupsPage = observer((): JSX.Element => {
    const meetupsStore = useStore('MeetupsStore')

    useEffect((): void => {
        meetupsStore.fetchMeetups()
    }, [])

    return (
        <section className="container smoothPage">
            <div className={styles.meetupsPage}>
                <h1 className="basicH1">Митапы</h1>

                <Tabs className={styles.tabs}>
                    <TabList className={styles.tabList}>
                        <Tab className={styles.tabItem} selectedClassName={styles.selectedTabItem}>
                            Темы
                        </Tab>
                        <Tab className={styles.tabItem} selectedClassName={styles.selectedTabItem}>
                            На модерации
                        </Tab>
                        <Tab className={styles.tabItem} selectedClassName={styles.selectedTabItem}>
                            Будущие
                        </Tab>
                        <Tab className={styles.tabItem} selectedClassName={styles.selectedTabItem}>
                            Прошедшие
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <MeetupsList meetups={meetupsStore.requsetMeetups} status="REQUEST" />
                    </TabPanel>
                    <TabPanel>
                        <MeetupsList meetups={meetupsStore.draftMeetups} status="DRAFT" />
                    </TabPanel>
                    <TabPanel>
                        <MeetupsList meetups={meetupsStore.futureMeetups} status="CONFIRMED" />
                    </TabPanel>
                    <TabPanel>
                        <MeetupsList meetups={meetupsStore.pastMeetups} status="CONFIRMED" />
                    </TabPanel>
                </Tabs>
            </div>
        </section>
    )
})

export default MeetupsPage
