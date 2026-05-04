from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debut=True, port=5000)