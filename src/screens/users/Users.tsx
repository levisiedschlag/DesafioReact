import React, { useEffect, useRef, useState } from "react"
import { UseFetch } from "../../hooks/UseFetch"
import { Dropdown, Form, Spinner, Table} from 'react-bootstrap'
import { BsXLg, BsPencil, BsThreeDotsVertical } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Users.css'

type userDataType = {
  id: number;
  name: string;
  email: string;
  username: string;
  company: {name:string};
}
export interface checkboxState {

  emailColumn:true,
  companyNameColumn:true,
  acessColumn: true,
}

function Users() {

   // API
  const {data: userData, isFetching} = UseFetch<userDataType[]>('https://jsonplaceholder.typicode.com/users')
  const [allFalse, setAllFalse] = useState(false)
  // RADIO
  const [selectedRadio, setSelectedRadio] = useState('standard')
  const isRadioSelected = (value:string): boolean => selectedRadio === value;
  const handleRadioSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedRadio(e.currentTarget.value)
    console.log('padrao ' + e.currentTarget.value)}

  // CHECKBOX USER
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [toggle, setToggle] = useState(inputRef.current?.checked)
  function handleToggle () {
    setToggle(!toggle)
  }

  // CHECKBOX EMAIL
  const inputRefEmail = useRef<HTMLInputElement | null>(null)
  const [toggleEmail, setToggleEmail] = useState(inputRefEmail.current?.checked)
  function handleToggleEmail () {
    setToggleEmail(!toggleEmail)
  }

  // CHECKBOX COMPANY
  const inputRefCompany = useRef<HTMLInputElement | null>(null)
  const [toggleCompany, setToggleCompany] = useState(inputRefCompany.current?.checked)
  function handleToggleCompany () {
    setToggleCompany(!toggleCompany)
  }

  // CHECKBOX ACESS
  const inputRefAcces = useRef<HTMLInputElement | null>(null)
  const [toggleAcces, setToggleAcces] = useState(inputRefAcces.current?.checked)
  function handleToggleAcces () {
    setToggleAcces(!toggleAcces)
  }

  // ALL FALSE
  
  useEffect(()=>{
    if (toggle && toggleAcces && toggleEmail && toggleCompany){
      setAllFalse(!allFalse)
    }else{
      setAllFalse(false)
    }
    
  },[toggle, toggleAcces, toggleEmail, toggleCompany])

  return (
    <div className='container'>
      {isFetching ? <div className="d-flex mt-5 justify-content-center">
          <Spinner animation="grow" variant="secondary" />
      </div> :

      <Table  striped size='sm' responsive="md">
        <tbody>
        <tr>

          {/* TABLE TITLES */}
          <th className="table__empty"></th>
          {!toggle && <th className='table__name'>USUÁRIO</th>}
          {!toggleEmail && <th className="table__email">EMAIL</th>}
          {!toggleCompany && <th className="table__companyname">CLIENTE</th>}
          {!toggleAcces && <th className="table__acess">PERFIL DE ACESSO</th>}
          {!allFalse && <th className="table__edit"></th>}
          {!allFalse && <th className="table__delete"></th>}
          <th className="table__empty">

            {/* DROPDOWN */}
            <Dropdown>
              <Dropdown.Toggle variant="default" className="dot__menu" >
                <BsThreeDotsVertical />
              </Dropdown.Toggle>
              <Dropdown.Menu flip={false} align="end">
                <Dropdown.Header>Linhas por página</Dropdown.Header>
                {/* RADIO */}
                <Dropdown.Item as={Form}><Form.Check 
                        type='checkbox'
                        label='Padrão'
                        value="standard"
                        defaultChecked
                        checked={isRadioSelected('standard')}
                        onChange={handleRadioSelect}
                      /></Dropdown.Item>
                <Dropdown.Item  as={Form}><Form.Check 
                        type='checkbox'
                        label='50 linhas'
                        value="extended"
                        checked={isRadioSelected('extended')}
                        onChange={handleRadioSelect}
                      /></Dropdown.Item>
                      <Dropdown.Divider />
                <Dropdown.Header>Colunas</Dropdown.Header>

                {/* CHECKBOX */}
                <Dropdown.Item  as={Form}><Form.Check 
                        ref={inputRef} 
                        type='checkbox'
                        name='checkboxState'
                        value='userColumn'
                        label='Usuário'
                        defaultChecked
                        onChange={handleToggle}
                      /></Dropdown.Item>
                <Dropdown.Item  as={Form}><Form.Check 
                        ref={inputRefEmail} 
                        type='checkbox'
                        name='checkboxState'
                        value='emailColumn'
                        label='E-mail'
                        onChange={handleToggleEmail}
                        defaultChecked 
                      /></Dropdown.Item>
                <Dropdown.Item  as={Form}><Form.Check 
                        type='checkbox'
                        name='checkboxState'
                        value='companyNameColumn'
                        label='Cliente'
                        ref={inputRefCompany}
                        onChange={handleToggleCompany}
                        defaultChecked 
                      /></Dropdown.Item>
                <Dropdown.Item as={Form}><Form.Check 
                        ref={inputRefAcces}
                        type='checkbox'
                        name='checkboxState'
                        value='acessColumn'
                        label='Perfil de acesso'
                        onChange={handleToggleAcces}
                        defaultChecked 
                      /></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </th>
        </tr>

        {/* TABLE CONTENT */}
        {
          userData?.map(user=> {
            return(
              <tr  key={user.id} id="table__row">
                <td></td>
                {!toggle && <td className='table__name'>{user.name}</td>}
                {!toggleEmail && <td className='table__email'>{user.email}</td>}
                {!toggleCompany && <td className='table__companyname'>{user.company.name}</td>}
                {!toggleAcces && <td className='table__acess'>{user.username}</td>}
                {!allFalse && <td><button className="pencil"><BsPencil /></button></td>}
                {!allFalse && <td><button className="xmark"><BsXLg /></button></td>}
                <td className="table__empty"></td>
              </tr> 
            )
          }
          )
        }
        </tbody>
      </Table>}
    </div>
  )
}

export default Users