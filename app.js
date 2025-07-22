import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.Random;

public class CliqueNoQuadrado extends JFrame {
    private JButton quadrado;
    private JLabel scoreLabel;
    private JLabel timerLabel;
    private int score = 0;
    private int timeLeft = 30; // segundos
    private Timer gameTimer;
    private Random rand = new Random();

    public CliqueNoQuadrado() {
        setTitle("Clique no Quadrado - Java Edition");
        setSize(600, 400);
        setLayout(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null); // Centraliza a janela

        // Pontuação
        scoreLabel = new JLabel("Pontuação: 0");
        scoreLabel.setBounds(20, 10, 150, 30);
        add(scoreLabel);

        // Timer
        timerLabel = new JLabel("Tempo: 30s");
        timerLabel.setBounds(460, 10, 120, 30);
        add(timerLabel);

        // Quadrado (botão)
        quadrado = new JButton();
        quadrado.setBackground(Color.RED);
        quadrado.setBounds(200, 200, 50, 50);
        quadrado.setFocusPainted(false);
        quadrado.setBorderPainted(false);
        quadrado.setContentAreaFilled(true);
        quadrado.setOpaque(true);

        quadrado.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                if (timeLeft > 0) {
                    score++;
                    scoreLabel.setText("Pontuação: " + score);
                    moverQuadrado();
                }
            }
        });

        add(quadrado);

        // Timer do jogo (1 segundo por tick)
        gameTimer = new Timer(1000, new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                timeLeft--;
                timerLabel.setText("Tempo: " + timeLeft + "s");

                if (timeLeft <= 0) {
                    gameTimer.stop();
                    quadrado.setEnabled(false);
                    JOptionPane.showMessageDialog(null, "⏰ Tempo esgotado!\nPontuação final: " + score);
                }
            }
        });

        gameTimer.start();
        moverQuadrado(); // Começa o jogo

        setVisible(true);
    }

    private void moverQuadrado() {
        int maxX = getContentPane().getWidth() - quadrado.getWidth();
        int maxY = getContentPane().getHeight() - quadrado.getHeight();

        int x = rand.nextInt(Math.max(1, maxX));
        int y = rand.nextInt(Math.max(1, maxY));

        quadrado.setLocation(x, y);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new CliqueNoQuadrado());
    }
}