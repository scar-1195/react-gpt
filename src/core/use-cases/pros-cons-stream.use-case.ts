export const prosConsStreamUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
        // todo: abortSignal
      },
    );

    if (!resp.ok) throw new Error('No se pudo realizar la corrección');

    const reader = resp.body?.getReader();

    if (!reader) {
      console.log('No se pudo generar el reader');
      return null;
    }

    return reader;

    // const decoder = new TextDecoder();

    // let text = '';

    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) {
    //     break;
    //   }

    //   const decodedChunck = decoder.decode(value, { stream: true });
    //   text += decodedChunck;
    //   console.log(text);
    // }


  } catch (error) {
    console.log(error);
    return null;
  }
};
