import React from 'react'
import styles from './MeetupsPage.module.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { MeetupsList } from '../../components/lists/meetupsList/MeetupsList'
import { Meetup } from '../../core/types/Meetup'
import { getMeetupsFromServer } from '../../core/utils/getMeetupsFromServer'

const MeetupsPage = (): JSX.Element => {
    const [allMeetups, setAllMeetups] = React.useState<Array<Meetup>>([])

    const loadAllMeetups = async () => {
        const receivedMeetups: Array<Meetup> = await getMeetupsFromServer()
        setAllMeetups(receivedMeetups)
    }

    React.useEffect((): void => {
        loadAllMeetups()
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
                        <MeetupsList meetups={allMeetups} status="REQUEST" />
                    </TabPanel>
                    <TabPanel>
                        <MeetupsList meetups={allMeetups} status="DRAFT" />
                    </TabPanel>
                    <TabPanel>
                        <MeetupsList meetups={allMeetups} status="DRAFT" />
                    </TabPanel>
                    <TabPanel>
                        <MeetupsList meetups={allMeetups} status="DRAFT" />
                    </TabPanel>
                </Tabs>
            </div>
        </section>
    )
}

export default MeetupsPage
