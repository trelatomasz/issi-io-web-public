from re import match

from flask import Flask
from flask import request

app = Flask(__name__)


@app.route('/calculate')
def hello_world():  # put application's code here
    op = request.args.get('op', type=str)
    arg1 = request.args.get('arg1', type=int)
    arg2 = request.args.get('arg2', type=int)
    result = 0
    result = calculate(arg1, arg2, op, result)


    return f"{arg1} {op} {arg2} = {result}"


def calculate(arg1, arg2, op, result):
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
