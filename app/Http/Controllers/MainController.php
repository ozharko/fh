<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Card;
use App\Order;
use DateTime;

class MainController extends Controller
{
	public 	$forms;
	private $private_key;
	private $public_key;
	private $cards;

	public function __construct()
	{
		$this->public_key = "i16450484609";
		$this->private_key = "ZLis7tH87OJPsqD1xdx90WH8zuDMnRTomYKgcQGk";
		$this->cards = Card::get();;
	}

	public function index()
	{
		$this->get_liq_pay_form();

		return view('index', [
			'cards' => $this->cards,
		]);
	}

	private function get_liq_pay_form()
	{

		foreach ($this->cards as $key => $card) {

			if ($card->discount)
				$discount_price = $card->price * (100 - $card->discount) / 100;
			else
				$discount_price = $card->price;

			$order_id = $this->random_string(10, $card->title);

			$datetime = new DateTime();

			$order = new Order;
			$order->order_id = $order_id;
			$order->card_id = $card->id;
			$order->card_title = $card->title;
			$order->time = $datetime;
			$order->active = 0;

			$description = "$card->title. Цена $discount_price грн. ID покупки $order_id";

			$json_string = json_encode(
				array(
					"public_key" => $this->public_key,
					"version" => "3",
					"action" => "pay",
					"amount" => "$discount_price", // цена как строка или как число 
					"currency" => "UAH",
					"description" => $description,
					// "type" => "buy",
					"order_id" => strtoupper($order_id),
					"result_url" => "http://reactor.fithaus.com.ua",
					"server_url" => "http://reactor.fithaus.com.ua/activate_order",
					"sandbox" => "1"
				)
			);
			$data = base64_encode( $json_string );
			$signature = base64_encode( sha1($this->private_key . $data . $this->private_key, 1 ) );
			
			$order->data = $data;
			$order->signature = $signature;

			$order->save();
			
			$this->cards[$key]->discount_price = $discount_price;
			$this->cards[$key]->data = $data;
			$this->cards[$key]->signature = $signature;
			$this->cards[$key]->description = $description;
		}
	}

	private function random_string($str_length, $str_characters)
	{
		$str_characters = array (0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');

		// Функция может генерировать случайную строку и с использованием кириллицы
		//$str_characters = array (0,1,2,3,4,5,6,7,8,9,'а','б','в','г','д','е','ж','з','и','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','э','ю','я');

		// Возвращаем ложь, если первый параметр равен нулю или не является целым числом
		if (!is_int($str_length) || $str_length < 0)
		{
		    return false;
		}

		// Подсчитываем реальное количество символов, участвующих в формировании случайной строки и вычитаем 1
		$characters_length = count($str_characters) - 1;

		// Объявляем переменную для хранения итогового результата
		$string = '';

		// Формируем случайную строку в цикле
		for ($i = $str_length; $i > 0; $i--)
		{
		    $string .= $str_characters[mt_rand(0, $characters_length)];
		}

		// Возвращаем результат
		return $string;
	}

	public function activate_order(Request $request)
	{
		Order::find(1)->update(array('data' => json_encode($request->toArray())));
		$r = $request->toArray();

		if ($r['data'] && $r['signature'])
		{
			$data = $r['data'];
			$signature = $r['signature'];

			Order::where('signature', $signature)->update(['active' => 1]);
		}
	}
}
