import  * as Dialog  from "@radix-ui/react-dialog";
import { Check, GameController } from "phosphor-react";
import { Input } from "./Input";
import * as Checkbox from "@radix-ui/react-checkbox"
import { useState, useEffect, FormEvent } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group"
import axios from "axios";

interface Game {
    id: string,
    title: string,
  }



export function CreateAdModal() {
    
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]> ([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    console.log(weekDays)
      
    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
        }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if (!data.name) return

        try {
            
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
    
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel,
    
            })

            alert('Anúncio criado com sucesso!')
        } catch (error) {
            console.log(error);
            
            alert('Erro ao criar o anúncio!')
        }


        console.log(data);
        console.log(weekDays);
        console.log(useVoiceChannel);
        
    }
 
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-2xl text-white font-black'> Publique um anúncio </Dialog.Title>
                
                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>

                    <div className='flex flex-col gap-2'> {/* game */}
                        <label htmlFor='game' className='font-semibold'>Qual o game?</label>
                        <select 
                            className="bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 appearance-none"
                            name="game" id="game"
                            defaultValue=''
                        >
                            <option disabled hidden>Selecione o game que deseja jogar</option>

                            { games.map(game => { return <option key={game.id} value={game.id}>{game.title}</option> }) }


                            
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'> {/* nickname */}
                        <label htmlFor="name">Seu nome (ou Nickname)</label>
                        <Input type="text" placeholder='Como te chamam dentro do game?' name="name" id="name" />
                    </div>

                    <div className='grid grid-cols-2 gap-6'> {/* yearwsPlaying & discord */}
                        <div className='flex flex-col gap-2'> {/* yearwsPlaying */}
                            <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                            <Input type="number" placeholder='Tudo bem ser ZERO' name="yearsPlaying" id="yearsPlaying" />
                        </div>

                        <div className='flex flex-col gap-2'> {/* discord */}
                            <label htmlFor="discord">Qual o seu discord?</label>
                            <Input type="text" placeholder='usuario#0000' name="discord" id="discord" />
                        </div>

                    </div>

                    <div className='flex gap-6'> {/* weekDays & housStart & hoursEnd */}

                        <div className='flex flex-col gap-2'> {/* weekDays*/}

                            <label htmlFor="weekDays">Dias que costuma jogar?</label>
                            <ToggleGroup.Root 
                                type="multiple" 
                                className='grid grid-cols-4 gap-2'
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <ToggleGroup.Item
                                    value="0"
                                    className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                                    title='Domingo'
                                >
                                    D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="1"
                                    className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                                    title='Segunda'
                                    >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="2"
                                    className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                                    title='Terça'
                                    >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="3"
                                    className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                                    title='Quarta'
                                    >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="4"
                                    className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                                    title='Quinta'
                                    >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="5"
                                    className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                                    title='Sexta'
                                    >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="6"
                                    className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                                    title='Sabado'
                                >
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>

                        <div className='flex flex-col gap-2 flex-1'> {/* housStart & hoursEnd */}
                            <label htmlFor="hourStart">Em qual horário?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input type="time" placeholder='De' name="hourStart" id="hourStart" />
                                <Input type="time" placeholder='Até' name="hourEnd" id="hourEnd" />
                            </div>
                        </div>
                    </div>

                    <label className='mt-2 flex items-center gap-2 text-sm'> {/* checkbox */}
                        <Checkbox.Root 
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked === true ) {
                                    
                                    setUseVoiceChannel(true)
                                } else {

                                    setUseVoiceChannel(false)
                                }
                            }}
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                        >
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator> 
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className='mt-4 flex justify-end gap-4'> {/* cancel & submit*/}
                        {/* cancel */}
                        <Dialog.Close 
                        className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
                        >
                            Cancelar
                        </Dialog.Close>

                        {/* submit */}
                        <button 
                            type="submit"
                            className="bg-violet-500 px-5 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                        >
                            <GameController size={24}/>  
                            Encontrar duo
                        </button>
                    </footer>

                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}