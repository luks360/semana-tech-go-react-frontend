interface GetRoomMessagesRequest {
  roomId: string
}

export interface GetRoomMessageResponse {
  messages: {
    id: string;
    text: string;
    amountOfReactions: number;
    answered: boolean;
  }[]
}

export async function getRoomMessages({ roomId }: GetRoomMessagesRequest): Promise<GetRoomMessageResponse> {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`)

  const data: Array<{
    ID: string
    RoomID: string
    Message: string
    ReactionCount: number
    Answered: boolean
  }> = await response.json()

  return {
    messages: data.map(item => {
      return {
        id: item.ID,
        text: item.Message,
        amountOfReactions: item.ReactionCount,
        answered: item.Answered
      }
    })
  }
}