import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export default function App() {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [firstValue, setFirstValue] = useState('');
    const [equation, setEquation] = useState(''); // New state for the equation

    const handleNumberInput = (num) => {
        if (displayValue === '0') {
            setDisplayValue(num.toString());
            setEquation(equation + num.toString());
        } else {
            setDisplayValue(displayValue + num);
            setEquation(equation + num.toString());
        }
    };

    const handleOperatorInput = (operator) => {
        setOperator(operator);
        setFirstValue(displayValue);
        setDisplayValue('0');
        setEquation(equation + ' ' + operator + ' ');
    };

    const handleEqual = () => {
        const num1 = parseFloat(firstValue);
        const num2 = parseFloat(displayValue);

        let result = 0;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
        }

        setDisplayValue(result.toString());
        setEquation(equation + ' = ' + result); // Show full equation with result
        setOperator(null);
        setFirstValue('');
    };

    const handleClear = () => {
        setDisplayValue('0');
        setOperator(null);
        setFirstValue('');
        setEquation(''); // Clear the equation
    };

    const renderButton = (content, onPress, buttonStyle = null, textStyle = null) => (
        <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, textStyle]}>{content}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.calculatorBody}>
                <View style={styles.displayContainer}>
                    <Text style={styles.equationText} numberOfLines={1} adjustsFontSizeToFit>
                        {equation} {/* Show the equation */}
                    </Text>
                    <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
                        {displayValue}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.row}>
                        {renderButton('C', handleClear, styles.specialButton, styles.specialButtonText)}
                        {renderButton('±', () => {}, styles.specialButton, styles.specialButtonText)}
                        {renderButton('%', () => {}, styles.specialButton, styles.specialButtonText)}
                        {renderButton('÷', () => handleOperatorInput('/'), styles.operatorButton, styles.operatorButtonText)}
                    </View>
                    <View style={styles.row}>
                        {renderButton('7', () => handleNumberInput(7))}
                        {renderButton('8', () => handleNumberInput(8))}
                        {renderButton('9', () => handleNumberInput(9))}
                        {renderButton('×', () => handleOperatorInput('*'), styles.operatorButton, styles.operatorButtonText)}
                    </View>
                    <View style={styles.row}>
                        {renderButton('4', () => handleNumberInput(4))}
                        {renderButton('5', () => handleNumberInput(5))}
                        {renderButton('6', () => handleNumberInput(6))}
                        {renderButton('−', () => handleOperatorInput('-'), styles.operatorButton, styles.operatorButtonText)}
                    </View>
                    <View style={styles.row}>
                        {renderButton('1', () => handleNumberInput(1))}
                        {renderButton('2', () => handleNumberInput(2))}
                        {renderButton('3', () => handleNumberInput(3))}
                        {renderButton('+', () => handleOperatorInput('+'), styles.operatorButton, styles.operatorButtonText)}
                    </View>
                    <View style={styles.row}>
                        {renderButton('0', () => handleNumberInput(0), styles.zeroButton)}
                        {renderButton('.', () => {})}
                        {renderButton('=', handleEqual, styles.equalButton, styles.equalButtonText)}
                    </View>
                </View>
                <Text style={styles.signature}>Calc by Tanmay Rajiwade</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Darker background for modern look
        alignItems: 'center',
        justifyContent: 'center',
    },
    calculatorBody: {
        width: 360, // Slightly wider for better button spacing
        backgroundColor: '#1E1E1E',
        borderRadius: 25, // Rounded corners for a sleek design
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6, // Subtle shadow depth
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 10,
    },
    displayContainer: {
        height: 140, // Taller display for better readability
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 15,
        backgroundColor: '#262626', // Softer contrast for display background
        borderRadius: 15,
        marginBottom: 20,
    },
    equationText: {
        fontSize: 18, // Slightly smaller for the equation
        color: '#B0B0B0',
        textAlign: 'right',
    },
    displayText: {
        fontSize: 56, // Larger text for primary display
        color: '#FFFFFF',
        fontWeight: '600',
    },
    buttonContainer: {
        gap: 12, // Increased spacing between rows
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12, // Increased spacing between buttons
    },
    button: {
        width: 75,
        height: 75, // Slightly larger buttons
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333333',
        borderWidth: 1,
        borderColor: '#444444', // Subtle border for button edges
    },
    buttonText: {
        fontSize: 26, // Slightly larger text for buttons
        color: '#EAEAEA',
        fontWeight: '500',
    },
    specialButton: {
        backgroundColor: '#444444',
        borderColor: '#555555', // Darker for special buttons
    },
    specialButtonText: {
        color: '#FFA726', // Orange for visibility
    },
    operatorButton: {
        backgroundColor: '#444444',
        borderColor: '#555555',
    },
    operatorButtonText: {
        color: '#42A5F5', // Light blue for operators
    },
    equalButton: {
        backgroundColor: '#66BB6A', // Green for equal button
        borderColor: '#66BB6A',
    },
    equalButtonText: {
        color: '#FFFFFF',
        fontSize: 30,
    },
    zeroButton: {
        width: 160, // Wider button for "0"
    },
    signature: {
        color: '#9E9E9E', // Subtle text color for signature
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
        fontStyle: 'italic', // Adds a personal touch
    },
});
