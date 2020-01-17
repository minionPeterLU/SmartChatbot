import pymysql

# Local database connection
HOST = 'localhost' # host url
DBNAME = 'chatbot' # your database name
USER = 'root'      # your username
PASSWORD = 'ZYXzyx233' # your password
PORT = 3306

def get_conn():
    conn = None
    try:
        #MySQL connection
        conn = pymysql.connect(host=HOST, port=PORT, user=USER, passwd=PASSWORD, db=DBNAME)
    except:
        print("Connection Error Detected!")

    return conn