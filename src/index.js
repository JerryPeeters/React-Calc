import React from 'react';
import {render} from 'react-dom';

const Button = props => (
    <button onClick={props.onClick}>{props.name}</button>
)

const Display = props => (
    <h1>{props.buffer.map( (buf) => buf + ' ')}
    </h1>
)

class Calculator extends React.Component {
    constructor() {
        super()
        this.state = {
            buffer: [0]
        }
        this.buttons = {
            numbers: this.getNumbers(),
            operators: this.getOperators(),
            specials: ['clear', '=']
        }
    }

    getNumbers() {
        let arr = []
        for (let i = 0; i < 10; i++) {
            arr.push(i)
        }
        return arr
    }

    getOperators() {
        let arr = []
        for (let op in this.operations) {
            arr.push(op)
        }
        return arr
    }

    operations = {
        '+': function(a ,b) { return a + b },
        '-': function(a, b) { return a - b },
        'x': function(a, b) { return a * b },
        '/': function(a, b) { return a / b },
        '**': function(a, b) { return a ** b }
    }

    input(value) {
        let buffer = this.state.buffer
        let tar = this.buttons.operators.includes(value) ? 1 :
                  buffer[1] ? 2 :
                  0
        if (value === '=') {
            return this.calculate()
        }
        if (value === 'clear') {
            return this.setBuffer()
        }
        if (tar === 1 && buffer[1]) {
            return
        }
        return this.pushBuffer(tar, value)
    }

    pushBuffer(tar, val) {
        let arr = [...this.state.buffer]
        if (arr[tar] === 0 || arr[tar] === undefined) {
            arr[tar] = val
        } 
        
        else {
            arr[tar] = arr[tar] + '' + val
        }
        this.setState({
            buffer: arr
        })
    }

    calculate() {
        let buffer = this.state.buffer
        if (!buffer[1]) return
        if (!buffer[2]) buffer[2] = 0
        let a = +buffer[0]
        let b = +buffer[2]
        let op = buffer[1]

        let result = this.operations[op](a, b)

        this.setBuffer(result)
    }

    setBuffer(a, op, b) {
        let arr = a ? [a] : [0]
        if (op) arr.push( '' + op )
        if (b) arr.push( '' + b )

        this.setState({
            buffer: arr
        })
    }

    render() {
        return (
            <div>
                <Display buffer={this.state.buffer} />
                {this.buttons.numbers.map(val => (
                        <Button 
                            key={val}
                            name={val} 
                            onClick={() => this.input(val)}      
                        />
                ))}
                <br/>
                {this.buttons.operators.map(val => (
                        <Button 
                            key={val}
                            name={val} 
                            onClick={() => this.input(val)}    
                        />
                ))}
                <br/>
                {this.buttons.specials.map(val => (
                        <Button 
                            key={val}
                            name={val} 
                            onClick={() => this.input(val)}      
                        />
                ))}          
            </div>
        )
    }
}

render(<Calculator />, document.getElementById('root'));
