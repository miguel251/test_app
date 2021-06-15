import styled from 'styled-components';
import bitcoin from './bitcoin.svg';
import moment from 'moment';
import _ from 'lodash';
import { LocalGroceryStore, Storefront } from '@material-ui/icons';

const Card = ({ type, amount = 0, date = "2021-05-29", type_transaction, bought = 0, action_price = 0 }) => {

    let [ year, month, day ] = date.split(/-|T.*/);
    console.log(month);

    const cardData = [
        {
            type:'deposit',
            backgroundColor:'#23B684',

        },
        {
            type:'withdraw',
            backgroundColor:'#E74C3C',
    
        },
        {
            type:'swap',
            backgroundColor:'#3498DB',
            icon: bitcoin,
    
        },
    ];

    let data = _.find(cardData,(color) => { return color.type === type });
    return (
        <CardStyle bgColor={data?.backgroundColor || '#D2D7D3'}>
            <Row>
                <Col col3>
                    <div className="date">
                        <h1>{day}</h1>
                        <p>{moment.monthsShort('-MMM-', month - 1)}</p>
                    </div>
                </Col>
                <Col col3>
                    <div className="container-type">
                        <h1>{data?.type}</h1>
                        {
                            type === 'swap' ? (
                                <div>
                                    <h1 className="mount" style={{ lineHeight: 1 }}>{bought}</h1>
                                    <p style={{ margin: 0 }}>${Intl.NumberFormat().format(action_price) || 0}</p>
                                </div>
                            ):(<h1 className="mount">${Intl.NumberFormat().format(amount)}</h1>)
                        }
                        
                    </div>
                </Col>
                <Col col3>
                    <div className="container-status">
                        <p>{year}</p>
                        {
                            type === 'swap' && <div className="icon-bottom"> { type_transaction === 'sell' ? <Storefront/> : <LocalGroceryStore/> } <img  src={data.icon} width="20%"/></div>
                        }
                    </div>
                </Col>
            </Row>
        </CardStyle>
    )
}

const CardStyle = styled.div `
    max-width: 400px;
    color: ${ props => props.bgColor === '#D2D7D3' ? 'black' : 'white' };
    border: 1px solid ${props => props.bgColor};
    background-color: ${props => props.bgColor};
    box-shadow: -4px -1px 17px -1px rgba(0,0,0,0.75);
    border-radius:0.25rem;
    height: 150px;
    margin:auto;
`;

const Row = styled.div`
    display:flex;
`

const Col = styled.div `
    width: ${props => props.col3 ? '33.333%' : ' auto'};
    &&{
        text-align: center;
    }
    .date {
        padding: 2rem;
        line-height: 0;
    }

    .container-type {
        margin-top:1.5rem;
        line-height:1.5;

        h1{
            margin:0;
            text-transform: uppercase;
            font-weight: 300;
        }

        .mount {
            font-weight: bold;
        }
    }

    .container-status {
        position:relative;
        height: 120px;
        left:0;

        .icon-bottom {
            position:absolute;
            bottom: 0;
            padding-bottom: 0rem;
        }
    }
`

export default Card;