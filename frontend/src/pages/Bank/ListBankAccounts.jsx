import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountsByUser } from '@src/slices/accountSlice';
import Loading from '@src/components/Loading';

const ListBankAccounts = () => {

  const { loading, accounts } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getAccountsByUser());

  }, [dispatch])

  if(loading) {
    return <Loading />;
  }

  console.log(accounts);

  return (
    <div>ListBankAccounts</div>
  )
}

export default ListBankAccounts
