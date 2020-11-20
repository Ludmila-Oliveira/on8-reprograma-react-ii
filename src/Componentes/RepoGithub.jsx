import { useState, useEffect } from "react"

import TitleGit from './TitleGit'

const RepoGithub = () => {
    const [searchData,  setSearchData] = useState('')
    const [repositories, setRepositories] = useState([])
    const [filterRepos, setFilterRepos] = useState([])

    
    useEffect(() => {
        async function getData() {
            const response = await fetch('https://api.github.com/users/ludmila-oliveira/repos')
            const object = await response.json()

            console.log(object)

            setRepositories(object) 
        }
        getData() 

    }, [])

    useEffect(()=>{
        setFilterRepos(
            repositories.filter(nameRepo => {
                return nameRepo.name.includes(searchData)
            })
        )

    }, [searchData, repositories])

    return (
        <>
            <TitleGit>Pesquise um usuário e seus repositórios: </TitleGit>

            <input type="text" placeholder="Digite um repositório" onChange={e => {setSearchData(e.target.value)}}/>

            <ul>{filterRepos.map(repo => {
                return <li key={repo.id}>{repo.name}</li>})}
            </ul>
        </>
    )
}

export default RepoGithub 