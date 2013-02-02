<?php 

	header('Content-type:application/xml');

	$xmlurl = "http://www.engadget.com/rss.xml";

	$file_handle = fopen($xmlurl,"r");

	if($file_handle)
	{
		while(! feof($file_handle))
		{
			$buffer = fgets($file_handle,4096);
			echo $buffer;
		}
	}
	
 ?>