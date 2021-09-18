import {Avatar, Button, Image, Input, Spin, Tooltip} from "antd";
import axios from "axios";
import {useEffect, useState} from "react";
import m from './praktika.module.css'
import {SearchOutlined, CloseCircleOutlined} from '@ant-design/icons';

const startTimerValue = 10

export const PraktikaPage = () => {
    console.log('render: PraktikaPage ')

    // const [searchingButton, changeSearchingButton] = useState(false)
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [isDisabled, setDisabled] = useState(false)

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])
    return (
        <div>
            <Search onSubmit={(value: string) => {
                setSearchTerm(value)
            }}
                    value={searchTerm} isDisabled={isDisabled}/>

            <Button size='small' type='primary' shape='circle' danger
                    icon={<CloseCircleOutlined style={{fontSize: '17px'}}
                                               onClick={() => {
                                                   if (!isDisabled) setSearchTerm('')
                                               }}
                    />}/>
            <UsersList term={searchTerm} selectedUser={selectedUser} onUserSelected={setSelectedUser}
                       setDisabled={setDisabled}/>
            <UserDetails user={selectedUser}/>


        </div>
    )
}


export const Search = ({isDisabled, value, onSubmit}: SearchPropsType) => {
    console.log('render: Search ')

    const [tempSearch, setTempSearch] = useState('')
    useEffect(() => {
        setTempSearch(value)
    }, [value])


    return (<>
        <Input value={tempSearch} style={{width: '20em', height: '2em'}} placeholder='search' disabled={isDisabled}
               onChange={(e) => {
                   setTempSearch(e.currentTarget.value)
               }}
               onPressEnter={() => {
                   onSubmit(tempSearch)

               }}/>
        <Tooltip title='search'>
            <Button type='primary' shape="round" icon={<SearchOutlined/>} loading={isDisabled}
                    onClick={() => {
                        onSubmit(tempSearch)
                    }}
            >
                Find
            </Button>


        </Tooltip>
    </>)
}

export const UsersList = ({setDisabled, selectedUser, onUserSelected, term}: UsersListType) => {
    console.log('render: UsersList ')
    // let color = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase()


    const [users, setUsers] = useState<SearchUserType[]|null>([])
    useEffect(() => {
        if (!term) {
            setUsers(null)
        }else{
            setDisabled(true)
            axios.get<SearchResultType>(`https://api.github.com/search/users?q=${term}`).then(
                res => {
                    setUsers(res.data.items)

                    setDisabled(false)
                }
            )
        }
    }, [term])


    return (
        <div>
            <ul>
                {users?.map(u =>
                    <li key={u.id}
                        className={selectedUser === u ? m.selectedUser : m.noSelectedUSer}
                        onClick={() => {
                            onUserSelected(u)
                        }}>
                        <Avatar src={u.avatar_url}/>{u.login}
                    </li>)}
            </ul>
        </div>
    )
}

export const Timer = (props: TimerPropsType) => {

    console.log('render: Timer ')

    const [seconds, setSeconds] = useState(props.seconds)
    useEffect(() => {
        // console.log('setSeconds')
        setSeconds(props.seconds)
    }, [props.seconds])

    useEffect(() => {
        //  console.log('setActualSeconds')
        props.setActualSeconds(seconds)
    }, [seconds])

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('tick')
            setSeconds((prev) => prev - 1)

        }, 1000)
        return () => {
            clearInterval(intervalId)
        }
    }, [props.timerKey])

    const color = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()
    const [colorTimer, setColorTimer] = useState(color)
    useEffect(() => {
        setColorTimer(color)
    }, [seconds])

    return (
        <div style={{position: 'absolute', right: '0.5em', top: '0em', fontSize: '4em'}}>
            <span style={{color: colorTimer, userSelect: 'none', cursor: 'pointer'}} onClick={() => {
                setColorTimer(color)
            }}>
                {seconds}
            </span>
        </div>
    )
}

export const UserDetails = ({user}: UserDetailsPropsType) => {

    console.log('render: UserDetails ')
    const [seconds, setSeconds] = useState(startTimerValue)
    const [userDetails, setUserDetails] = useState<UserType | null>(null)
    const [isLoadingUserDetails, setLoadingUserDetails] = useState(false)

    useEffect(() => {

        if (!!user) {
            setLoadingUserDetails(true)
            axios.get<UserType>(`https://api.github.com/users/${user.login}`).then(
                res => {
                    setSeconds(startTimerValue)
                    setUserDetails(res.data)
                    setLoadingUserDetails(false)
                }
            )
        }
    }, [user])

    useEffect(() => {
        if (seconds < 1) {
            setSeconds(0)
        }
    }, [seconds])
    if(isLoadingUserDetails)return <Spin style={{position:'fixed', right:'20%', top:'30%'}} />
    return (
        <div style={{
            position: 'fixed',
            top: '6em',
            right: '3em',
            width: '55em',
            minHeight: '40em',
        }}>
            {userDetails && seconds > 0 ?  <div>
                <div style={{textAlign: 'center',}}>
                    <h1 style={{fontSize: '2em'}}>
                        {userDetails?.name}
                    </h1>
                </div>

                <Timer seconds={seconds} setActualSeconds={setSeconds} timerKey={userDetails.id.toString()}/>
                <div style={{width: '15em', height: '15em', border: 'black 1px solid', marginLeft: '3em'}}>
                    <Image style={{objectFit: 'cover', width: '100%'}}
                           src={user ? userDetails?.avatar_url : '#'} alt={'No Photo'}/>
                </div>

                <div style={{fontSize: '2em', marginLeft: '1em'}}>
                    <div>
                        {user ?
                            <span style={{color: 'blue'}}>{userDetails?.email}</span>
                            : null}
                    </div>

                    <div>
                        Количество подписчиков: <span style={{color: 'blue'}}>{userDetails?.followers}</span>
                    </div>
                </div>

            </div> : null }
        </div>
    )
}


type SearchUserType = {
    login: string
    id: number
    avatar_url: string
}
type UserType = {
    login: string
    name: string | null
    id: number
    avatar_url: string
    followers: number
    email: string | null

}
type SearchResultType = {
    items: SearchUserType[]
}

type SearchPropsType = {
    isDisabled: boolean
    value: string
    onSubmit: (fixedValue: string) => void
}
type UsersListType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelected: (user: SearchUserType) => void
    setDisabled: (isDisabled: boolean) => void
}
type UserDetailsPropsType = {
    user: SearchUserType | null
}
type TimerPropsType = {
    seconds: number
    setActualSeconds: (actualSeconds: number) => void
    timerKey: string
}