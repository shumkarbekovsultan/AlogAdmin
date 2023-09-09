import { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell, IconButton } from "@mui/material";
import Preloader from "../../components/preloader/Preloader";
import useCities from './../../hooks/useCities';
import CartTable from './../../components/tables/CartTable';

function CartPage() {
    const { cart, getCities, isLoading } = useCities();

    useEffect(() => {
        getCities();
    }, [getCities]);

    const renderList = useMemo(
        () => cart.map((el) => <CartTable key={el.tid} {...el} />),
        [cart]
    );

    if (isLoading) return <Preloader full />;
    return (
        <PageContainer
            title="Users"
        >
            <TableContainer
                isLoading={isLoading}
                Header={
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Имя</TableCell>
                        <TableCell>Роль</TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                    </TableRow>
                }
                Body={renderList}
            />
        </PageContainer>
    );
}

export default CartPage;
