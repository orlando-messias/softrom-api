import React, {createContext, useState} from 'react';

export const AppContext = createContext();

export function AppContextProvider(props) {
  const [companies, setCompanies] = useState([]);
  const [onInsert, setOnInsert] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [editCompany, setEditCompany] = useState({
    nome: '',
    tipo_doc: '',
    documento: '',
    gerar_nf: false,
    retem_iss: false,
    obs: '',
    agrupar_fatura_contrato: false
  });

  const context = {
    companies,
    setCompanies,
    editCompany,
    setEditCompany,
    onInsert,
    setOnInsert,
    onEdit,
    setOnEdit,
    onDelete,
    setOnDelete
  };

  return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
};