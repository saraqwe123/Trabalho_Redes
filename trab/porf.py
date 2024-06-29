import sys
from random import randint

import numpy as np
from PyQt5.QtGui import QIntValidator
from PyQt5.QtWidgets import (
    QApplication,
    QLabel,
    QMainWindow,
    QPushButton,
    QVBoxLayout,
    QWidget, QGridLayout, QLineEdit, QComboBox, QMessageBox, QTableWidgetItem, QTableWidget, QHeaderView,
)


class Resultado(QWidget):
    """
    This "window" is a QWidget. If it has no parent,
    it will appear as a free-floating window.
    """

    def __init__(self, endereco, mascara, quantidade):
        super().__init__()
        self.quantidade= int(quantidade)+1
        self.tableWidget = QTableWidget()

        self.tableWidget.setRowCount(self.quantidade)
        self.tableWidget.setColumnCount(6)

        self.set_header()
        self.set_values_sub()

        #Table will fit the screen horizontally
        self.tableWidget.horizontalHeader().setStretchLastSection(True)
        self.tableWidget.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)

        btn = QPushButton('calc')

        self.layout = QVBoxLayout()
        self.layout.addWidget(self.tableWidget)
        self.layout.addWidget(btn)
        self.setLayout(self.layout)

        self.setFixedWidth(800)
        self.setFixedHeight(400)
    def set_header(self):
        for idx, header in enumerate(['Subrede', 'Qtd de end', 'Intervalo', '1 end. valido', 'Ult. end. valido', 'Máscara'], start=0):
            self.tableWidget.setItem(0, idx, QTableWidgetItem(header))

    def set_values_sub(self):
        sub = np.arange(1, self.quantidade+1)
        for idx in range(1, self.quantidade):
            self.tableWidget.setItem(idx, 0, QTableWidgetItem(str(sub[idx-1])))

class Main(QMainWindow):
    def __init__(self):
        super().__init__()

        layout = QGridLayout(self)
        endereco_lbl = QLabel('Endereço IP')
        endereco = QLineEdit()
        layout.addWidget(endereco_lbl, 0, 0)
        # TODO add validator
        layout.addWidget(endereco, 1, 0)

        mascara_lbl = QLabel('Máscara')
        mascara = QComboBox()
        layout.addWidget(mascara_lbl, 2, 0)
        mascara.addItems(np.arange(1, 33).astype(str))
        layout.addWidget(mascara, 3, 0)

        qtd_lbl = QLabel('Qtd de hosts')
        layout.addWidget(qtd_lbl, 4, 0)
        qtd = QLineEdit()
        # valida se o valor eh inteiro
        qtd.setValidator(QIntValidator())
        layout.addWidget(qtd, 5, 0)

        btn = QPushButton('Let\'s go!', self)
        layout.addWidget(btn, 6, 0)
        btn.clicked.connect(lambda: self.button_clicked(endereco.text(), mascara.currentText(), qtd.text()))

        # define tamanho
        self.setFixedWidth(200)
        self.setFixedHeight(220)

        # define o layout
        w = QWidget()
        w.setLayout(layout)
        self.setCentralWidget(w)

    def button_clicked(self, endereco, mascara, qtd):
        if len(endereco) == 0  and len(qtd) == 0:
            dlg = QMessageBox(self)
            dlg.setWindowTitle("I have a question!")
            dlg.setText("This is a question dialog")
            dlg.setStandardButtons(QMessageBox.Ok)
            dlg.setIcon(QMessageBox.Warning)
            button = dlg.exec()
        else:
            self.resultado = Resultado(endereco, mascara, qtd)
            if self.resultado.isVisible():
                self.resultado.hide()
            else:
                self.resultado.show()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    w = Main()
    w.show()
    app.exec()
