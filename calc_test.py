class Calculator:
    def add(self, x, y):
        """Складывает два числа."""
        if not isinstance(x, (int, float)) or not isinstance(y, (int, float)):
            raise TypeError("Оба аргумента должны быть числами.")
        return x + y

    def subtract(self, x, y):
        """Вычитает y из x."""
        if not isinstance(x, (int, float)) or not isinstance(y, (int, float)):
            raise TypeError("Оба аргумента должны быть числами.")
        return x - y

    def multiply(self, x, y):
        """Умножает два числа."""
        if not isinstance(x, (int, float)) or not isinstance(y, (int, float)):
            raise TypeError("Оба аргумента должны быть числами.")
        return x * y

    def divide(self, x, y):
        """Делит x на y."""
        if not isinstance(x, (int, float)) or not isinstance(y, (int, float)):
            raise TypeError("Оба аргумента должны быть числами.")
        if y == 0:
            raise ZeroDivisionError("Деление на ноль недопустимо.")
        return x / y 
    
    def add(self, x, y):
        """Складывает два числа."""
        if not isinstance(x, (int, float)) or not isinstance(y, (int, float)):
            raise TypeError("Оба аргумента должны быть числами.")
        return x + y

    def subtract(self, x, y):
        """Вычитает y из x."""
        if not isinstance(x, (int, float)) or not isinstance(y, (int, float)):
            raise TypeError("Оба аргумента должны быть числами.")
        return x - y

    def multiply(self, x, y):
        """Умножает два числа."""
        if not isinstance(x, (int, float)) or not isinstance(y, (int, float)):
            raise TypeError("Оба аргумента должны быть числами.")
        return x * y

    def divide(self, x, y):
        """Делит x на y."""
        if not isinstance(x, (int, float)) or not isinstance(y, (int, float)):
            raise TypeError("Оба аргумента должны быть числами.")
        if y == 0:
            raise ZeroDivisionError("Деление на ноль недопустимо.")
        return x / y