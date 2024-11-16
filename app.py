"""This is the hello world app"""

from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/calculate')
def calculate():
    """This endpoint calculates opertaion on two arguments"""
    op = request.args.get('op', type=str)
    arg1 = request.args.get('arg1', type=int)
    arg2 = request.args.get('arg2', type=int)

    result = perform_operation(arg1, arg2, op)
    return f"{arg1} {op} {arg2} = {result}"

def perform_operation(arg1, arg2, op):
    """Perform operation on two arguments"""
    result = 0
    match op:
        case 'add':
            result = arg1 + arg2
        case 'multiply':
            result = arg1 * arg2
        case 'subtract':
            result = arg1 - arg2
        case 'divide':
            if arg2 != 0:
                result = arg1 / arg2
    return result

if __name__ == '__main__':
    app.run()
