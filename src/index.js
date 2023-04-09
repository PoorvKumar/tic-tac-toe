import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// class Square extends React.Component
// {
//     // constructor(props)
//     // {
//     //     super(props);
//     //     this.state={
//     //         value: null
//     //     };
//     // }

//     render()
//     {
//         return (<button className="square" 
//         onClick={() => { this.props.onClick(); console.log('click')}}>  
//             {/* {this.state.value} */}
//             {this.props.value}
//         </button>);
//     }
// }

function Square(props) //Funciton Component
{
    // return <button className="square"
    //         onClick={ () => { props.onClick(); console.log('click'); } }>
    //     {props.value}
    // </button>;
    return <button className="square"
            onClick={props.onClick}>
        {props.value}
    </button>;
}

class Board extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            squares: Array(9).fill(null) ,
            xIsNext: true //to maintain if x is/isNot next 
            //by default 'X' first 
        };
    }

    handleClick(i)
    {
        const squares=this.state.squares.slice();

        if(calculateWinner(squares) || squares[i])
        {
            return ;
        }
        // squares[i]='X';
        squares[i]=this.state.xIsNext?'X':'O';
        this.setState(
            {
                squares:squares,
                xIsNext: !this.state.xIsNext
            });
    }

    renderSquare(i)
    {
        return (<Square 
            value={this.state.squares[i] }
            onClick={ ()=> { this.handleClick(i); }}
        />);
    }

    render()
    {
        let status;
        let winner=calculateWinner(this.state.squares);
        if(winner && winner!=='D')
        {
            status=`Winner: ${winner}`;
        }
        else if(winner==='D')
        {
            status="It's a Draw!";
        }
        else
        {
            status=`Next Player: ${this.state.xIsNext?'X':'O'}`;
        }

        return (<div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        </div>);
    }
}

class Game extends React.Component
{
    render()
    {
        return (<div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div> {/* status */} </div>
                <ol> {/* TODO */} </ol>
            </div>
        </div>)
    }
}

function calculateWinner(squares)
{
    const lines=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i=0; i<lines.length; i++)
    {
        const [a,b,c]=lines[i];
        if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c])
        {
            return squares[a];
        }
    }

    for(let i=0; i<squares.length; i++)
    {
        if(!squares[i])
        {
            return null;
        }
    }

    return 'D';
}

const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);