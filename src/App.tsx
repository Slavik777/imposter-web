import { useMemo, useState } from 'react'
import { categories, pickRandom, WORDS_BY_CATEGORY, type Category } from './words'

type Stage = 'setup' | 'reveal' | 'play' | 'results'

// const WORDS = [
//   'Pizza','Movie','Doctor','Sun','Ship','Cat','Dog','Sea','Table','Chair',
//   'Watermelon','Coffee','Tea','Phone','Computer','Guitar','Park','City','Winter','Summer',
//   'Chocolate','Bread','Home','Balcony','Road','Music','Book','River','Mountain','Snow',
//   'Forest','Beach','Lamp','Pencil','Umbrella','Flower','Station','Plane','Train','Car',
//   'Apple','Pear','Strawberry','Banana','Orange','Lemon','Honey','Cheese','Egg','Cake',

//   'Ball','Backpack','Battery','Bridge','Bottle','Broom','Brush','Bus','BusStop','Cabin',
//   'Calendar','Camera','Candle','Candy','Canyon','Castle','Cave','Cereal','Chalk','Champagne',
//   'Church','Cinema','Clock','Cloud','Coat','Coin','Compass','Cookie','Court','Cow',
//   'Crayon','Crow','Cup','Curtain','Desk','Desert','Diamond','Domino','Door','Dragon',
//   'Drawer','Drum','Duck','Eagle','Engine','Envelope','Factory','Farm','Feather','Fence',
//   'Festival','Fire','Fireplace','Firework','Fish','Flag','Flute','Fog','Football','Fork',
//   'Fountain','Garage','Garden','Gem','Ghost','Glass','Glasses','Globe','Glue','Goat',
//   'Gold','Grapes','Grass','Hamburger','Hammer','Hat','Helmet','Hill','Hospital','Hotel',
//   'House','Ice','IceCream','Igloo','Island','Jacket','Jar','Jelly','Jungle','Kettle',
//   'Keyboard','Kite','Knife','Ladder','Lake','Leaf','Library','Lighthouse','Lion','Lizard',
//   'Mail','Map','Market','Mask','Match','Meadow','Microscope','Milk','Mirror','Moon',
//   'Motorcycle','Museum','Mushroom','Nail','Necklace','Needle','Newspaper','Notebook','Oasis','Ocean',
//   'Octopus','Office','Onion','Opera','Oven','Owl','Paint','Palette','Pancake','Panda',
//   'Paper','Parrot','Passport','Peach','Peanut','Pearl','Pen','Penguin','Pepper','Piano',
//   'Pickaxe','Picture','Pig','Pillow','Pineapple','Pipe','PizzaBox','Planet','Plank','Plate',
//   'Playground','Pocket','Police','Pond','Popcorn','Postcard','Potato','Printer','Pumpkin','Pyramid',
//   'Queen','Quill','Rabbit','Rainbow','Raindrop','Razor','Refrigerator','Ring','Robot','Rock',
//   'Rocket','Roof','Rope','Rose','Sail','Sand','Sandwich','Saxophone','Scarf','School',
//   'Scissors','Scooter','Screen','Seashell','Server','Shark','Sheep','Shelf','Shipwreck','Shoes',
//   'Shovel','Shrimp','Skateboard','Ski','Skull','Sky','Slipper','Smartphone','Snail','Snake',
//   'Soap','Sofa','Space','Spoon','Spring','Square','Squirrel','Stadium','Star','Statue',
//   'Steak','Stone','Store','Storm','Subway','Suit','Suitcase','Sunflower','Sushi','Swamp',
//   'Sweater','Sword','Taxi','TeaPot','Temple','Tent','Thermometer','Thunder','Ticket','Tiger',
//   'Toast','Toilet','Tomato','Toothbrush','Torch','Tower','Toy','TrafficLight','TrainStation','Trash',
//   'Tree','Triangle','Trampoline','Trophy','Truck','Turtle','Typewriter','UmbrellaStand','Unicorn','Uniform',
//   'Valley','Vase','Vegetables','Violin','Volcano','Wallet','Warehouse','Watch','Waterfall','Whale',
//   'Wheel','Windmill','Window','Wine','Wolf','Wood','Wool','Wrench','Xylophone','Yacht',
//   'Yogurt','Zebra','Zoo',

//   // people & roles
//   'Artist','Astronaut','Baker','Barber','Builder','Captain','Chef','Clown','Detective','Diver',
//   'Driver','Farmer','Firefighter','Fisherman','Judge','King','Knight','Magician','Mechanic','Nurse',
//   'Painter','Pilot','Plumber','PoliceOfficer','Programmer','Queen','Scientist','Singer','Soldier','Teacher',

//   // places & activities
//   'Airport','Aquarium','Bakery','Bank','Bar','Barbecue','Bedroom','Cemetery','Concert','Farmhouse',
//   'FestivalStage','Gym','Harbor','Highway','Kindergarten','Kitchen','Laboratory','Laundry','LibraryHall','MarketSquare',
//   'Mountaintop','OfficeDesk','Playroom','Port','Restaurant','RoofTop','SchoolYard','Suburb','Supermarket','SwimmingPool',
//   'Theater','Village','WarehouseDock','Workshop',

//   // extra foods
//   'Bagel','Biscuit','Brownie','Burger','Cabbage','Carrot','Chili','Corn','Croissant','Cucumber',
//   'Doughnut','Gingerbread','Gnocchi','Hotdog','Lasagna','Macaroni','Mango','Muffin','Noodles','Oatmeal',
//   'Olive','Pasta','Pie','Pretzel','Raspberry','Salad','Salmon','Sausage','Spaghetti','Stew',
//   'Strudel','SushiRoll','Taco','Tangerine','Waffle'
// ];


function Button({
  label, onClick, disabled, variant = 'primary', title,
}: {
  label: string
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  title?: string
}) {
  return (
    <button
      className={`btn ${variant} ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
      title={title}
      type="button"
    >
      {label}
    </button>
  )
}

const Chip = ({ text }: { text: string }) => <span className="chip">{text}</span>

export default function App() {
  const [stage, setStage] = useState<Stage>('setup')
  const [players, setPlayers] = useState<string[]>([])
  const [nameInput, setNameInput] = useState('')
  const [isCardShown, setIsCardShown] = useState(false)

  const [useRandomWord, setUseRandomWord] = useState(true)
  const [customWord, setCustomWord] = useState('')
  const [category, setCategory] = useState<Category>('all')

  // слово обираємо з теми, якщо Random; або беремо custom
  const word = useMemo(() => {
    if (useRandomWord) {
      const pool = WORDS_BY_CATEGORY[category]
      return pickRandom(pool)
    }
    return customWord.trim()
  }, [useRandomWord, customWord, category])

  const [secretWord, setSecretWord] = useState('')
  const [imposterIndex, setImposterIndex] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const minPlayers = 3
  const canStart = players.length >= minPlayers && (useRandomWord || customWord.trim().length > 0)

  function addPlayer() {
    const trimmed = nameInput.trim()
    if (!trimmed) return
    if (players.includes(trimmed)) {
      // eslint-disable-next-line no-alert
      alert('This name is already in the list.')
      return
    }
    setPlayers(p => [...p, trimmed])
    setNameInput('')
  }

  function removePlayer(name: string) {
    setPlayers(p => p.filter(n => n !== name))
  }

  function startGame() {
    if (!canStart) return
    const chosenWord = useRandomWord ? word : customWord.trim()
    if (!chosenWord) {
      // eslint-disable-next-line no-alert
      alert('Provide a word or enable Random.')
      return
    }
    const impIndex = Math.floor(Math.random() * players.length)
    setImposterIndex(impIndex)
    setSecretWord(chosenWord)
    setCurrentIndex(0)
    setIsCardShown(false)
    setStage('reveal')
  }

  function markRevealedAndNext() {
    setIsCardShown(false)
    if (currentIndex + 1 < players.length) setCurrentIndex(i => i + 1)
    else setStage('play')
  }

  function resetToSetup() {
    setStage('setup')
    setSecretWord('')
    setImposterIndex(null)
    setCurrentIndex(0)
    setIsCardShown(false)
    setCustomWord('')
    setUseRandomWord(true)
  }

  return (
    <div className="page">
      <header>
        <h1 className="center">IMPOSTER: GUESS WHO'S LIER</h1>
      </header>

      {stage === 'setup' && (
        <div className="card">
          <section>
            <h2>Players</h2>
            <div className="row">
              <input
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="Player name"
                onKeyDown={e => { if (e.key === 'Enter') addPlayer() }}
              />
              <Button label="Add" onClick={addPlayer} disabled={!nameInput.trim()} />
            </div>

            {players.length === 0 ? (
              <p className="muted">Add at least {minPlayers} players.</p>
            ) : (
              <div className="list">
                {players.map((item, index) => (
                  <div key={item} className="playerItem">
                    <Chip text={`#${index + 1}`} />
                    <span className="playerName">{item}</span>
                    <button className="removeBadge" onClick={() => removePlayer(item)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2>Secret Word</h2>
            <div className="row">
              <button
                className={`toggle ${useRandomWord ? 'active' : ''}`}
                onClick={() => setUseRandomWord(true)}
              >
                Random
              </button>
              <button
                className={`toggle ${!useRandomWord ? 'active' : ''}`}
                onClick={() => setUseRandomWord(false)}
              >
                Custom
              </button>
            </div>

            {useRandomWord ? (
              <>
                {/* NEW: header above category chips */}
                <div className="catLegend">
                  <strong>Choose a word category</strong>
                  <span className="catLegendSub">Words will be picked at random from this category.</span>
                </div>

                <div className="catGroup" role="group" aria-label="Word theme">
                  {categories.map(c => (
                    <button
                      key={c.value}
                      type="button"
                      className={`catBtn ${category === c.value ? 'active' : ''}`}
                      onClick={() => setCategory(c.value)}
                      title={`${c.label} (${WORDS_BY_CATEGORY[c.value].length})`}
                    >
                      <span>{c.label}</span>
                      <span className="badge">{WORDS_BY_CATEGORY[c.value].length}</span>
                    </button>
                  ))}
                </div>

                <p className="muted">Tip: the word refreshes when you restart setup.</p>
              </>
            ) : (
              <input
                className='customWord'
                value={customWord}
                onChange={e => setCustomWord(e.target.value)}
                placeholder="Enter a word"
              />
            )}
          </section>

          <div style={{ height: 12 }} />
          <Button label="Start Game" onClick={startGame} disabled={!canStart} />
          <p className="muted center">Minimum {minPlayers} players.</p>
        </div>
      )}

      {stage === 'reveal' && imposterIndex !== null && (
        <div className="center">
          <p className="muted">Reveal step: {currentIndex + 1} / {players.length}</p>
          <h2>Player: <strong>{players[currentIndex]}</strong></h2>
          <p className="muted">Hand the phone to this player. Tap “Show word”. After reading — “Hide & pass”.</p>

          <div className="revealCard">
            {!isCardShown ? (
              <Button label="Show word" onClick={() => setIsCardShown(true)} />
            ) : (
              <>
                <div className="bigText">
                  {currentIndex === imposterIndex ? 'YOU ARE THE IMPOSTER' : secretWord}
                </div>
                <p className="muted">Press “Hide & pass” when ready.</p>
              </>
            )}
          </div>

          <div style={{ height: 12 }} />
          <Button label="Hide & pass" onClick={markRevealedAndNext} />
          <div style={{ height: 8 }} />
          <Button label="Reset" onClick={resetToSetup} variant="ghost" />
        </div>
      )}

      {stage === 'play' && (
        <div className="center">
          <h2>Hint round starts</h2>
          <p className="muted">Each player says a hint related to the secret word…</p>
          <div style={{ height: 16 }} />
          <Button
            label="Reveal (who’s the imposter)"
            onClick={() => setStage('results')}
            variant="secondary"
          />
          <div style={{ height: 8 }} />
          <Button label="Reset" onClick={resetToSetup} variant="ghost" />
        </div>
      )}

      {stage === 'results' && imposterIndex !== null && (
        <div className="center">
          <h2>Round results</h2>
          <p className="result">Imposter: <strong>{players[imposterIndex]}</strong></p>
          <p className="result">Secret word: <strong>{secretWord}</strong></p>
          <div style={{ height: 16 }} />
          <Button label="New round" onClick={resetToSetup} />
        </div>
      )}
    </div>
  )
}
