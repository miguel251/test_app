import React, { lazy, Suspense } from 'react';
import Layout from '../../component/layout';
import _ from 'lodash'
import { Grid, Typography } from '@material-ui/core';
import LoadCard from '../../component/card/loadCard';
import useDeposit from '../../hooks/useDeposit';
import useSwap from '../../hooks/useSwap';
import useWithdraw from '../../hooks/useWithDraw';
import ListTransaction from '../../component/ListTransaction';
import { topTenElement } from '../../utils';

const Card = lazy(() => import('../../component/card'))

const Home = () => {

    const deposit = useDeposit();
    const swap = useSwap();
    const withdraw = useWithdraw();

    const { result, deposits } = deposit;
    const { resultSwaps, swaps } = swap;
    const { resultWithdraws, withdraws } = withdraw;

    let lastDeposit = result && deposits[_.head(result)];
    let lastSwap = resultSwaps && swaps[_.head(resultSwaps)];
    let lastWithDraw = resultWithdraws && withdraws[_.head(resultWithdraws)];

    let topTen = result && resultSwaps &&  _.concat([...result].splice(0,5), [...resultWithdraws].splice(0,5));
    let recentTransaction = topTen && topTenElement(topTen, withdraws, deposits);

    return(
     <Layout 
     title="DASHBOARD">
         <Grid container 
         spacing={3}
        justify="center"
        alignItems="center">
            <Grid item sm={12}>
                <Typography component="h1" variant="h5">
                    Latest Transactions 
                </Typography>
            </Grid>
             <Grid item xs={12} sm={4}>
                 <Suspense fallback={ <LoadCard/> }>
                    <Card 
                    type="deposit" 
                    amount={lastDeposit?.amount_neto}
                    date={lastDeposit?.updated_at} />
                 </Suspense>
             </Grid>
             <Grid item xs={12} sm={4}>
                 <Suspense fallback={ <LoadCard/> }>
                    <Card type="withdraw"
                        amount={lastWithDraw?.amount}
                        date={lastWithDraw?.updated_at}
                    />
                 </Suspense>
             </Grid>
             <Grid item xs={12} sm={4}>
                 <Suspense fallback={ <LoadCard/> }>
                    <Card t
                    type="swap" 
                    amount={lastSwap?.bought}
                    date={lastSwap?.updated_at}
                    type_transaction={lastSwap?.type}
                    bought={ lastSwap?.bought}
                    action_price={lastSwap?.action_price}
                    />
                 </Suspense>
             </Grid>
             <Grid item md={12}>
                 <Typography component="h1" variant="h5">
                     Recent Transactions
                 </Typography>
             </Grid>
             <Grid item md={12}>
                 <ListTransaction topten={topTen} data={recentTransaction} />
             </Grid>
         </Grid>
     </Layout>)
}

export default Home;