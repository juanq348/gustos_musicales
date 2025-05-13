const bands = [
    'Radiohead',
    'The Beatles',
    'Lana Del Rey',
    'Robbie Williams',
    'Beach House',
    'Mitski',
    'David Bowie',
    'ABBA',
    'Billie Joel'
    ]

const features = [
    'Alternativo',
    'Indie',
    'Rock',
    'Pop',
    'Dream Pop',
    ]   

// Music Styles <5>
const band_feats = tf.tensor([
    [1, 1, 0, 0, 0], //Radiohead
    [0, 0, 1, 1, 0], //The Beatles
    [0, 1, 0, 0, 1], //Lana Del Rey
    [0, 0, 0, 1, 0], //Robbie Williams
    [0, 1, 0, 0, 1], //Beach House
    [1, 1, 0, 0, 0], //Mitski
    [0, 0, 1, 1, 0], //David Bowie
    [0, 0, 0, 1, 0], //ABBA 
    [0, 0, 1, 1, 0], //Billie Joel
])

const container = document.getElementById("bands-container")
bands.forEach((band, i) =>{
    const label = document.createElement("label");
    label.innerText = `${band}: `;
    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 10;
    input.value = 5;
    input.id = `band-${i}`;
    label.appendChild(input);
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
})

function procesar() {
const votos = bands.map((_, i) =>
parseInt(document.getElementById(`band-${i}`).value)
);

const user_votes = tf.tensor([votos]);
const user_feats = tf.matMul(user_votes, band_feats);
const top_user_features = tf.topk(user_feats, features.length);
const top_genres = top_user_features.indices.arraySync()[0];
const ranking = top_genres.map((i) => features[i]);

document.getElementById("resultado").innerText =
"Tu ranking de estilos preferidos es:\n" + ranking.join(" > ");
}